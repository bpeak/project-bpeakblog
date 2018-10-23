import React, { Component } from 'react'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'
//modules
import history from '~modules/history'
import fetchCreator from '~modules/fetchCreator'
//admin components
import PostEditor from '../components/molecules/PostEditor/PostEditor'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = (dispatch) => ({
    postsReceived : (payload) => { dispatch(postsActionCreators.postsReceived(payload)) }
})

class PostEditorContainer extends Component {
    constructor(props){
        super(props)
        const mode = props.match.params.mode
        this.state = {
            mode,
            post_id : mode === 'write' ? undefined : Number(props.match.params.post_id),
            cover : null,
            title : '',
            intro : '',
        }
    }

    _uploadPostImgFile = (imgFile) => {
        const formData = new FormData()
        formData.append('imgFile', imgFile)
        const { userState } = this.props
        return fetchCreator('/api/admin/postImgFile', {
            method : "POST",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            },            
            body : formData
        })
    }

    imgFileUploadCallback = async (imgFile) => {
        try{
            const response = await this._uploadPostImgFile(imgFile)
            if(!response) { return }
            return ({ data : { link : response.imgTempSrc } })
        }
        catch(err){
            console.log(err)
        }
    }

    _getPosts = () => {
        return fetchCreator('/api/posts', {
            method : "GET"
        }, '포스트요청')
    }

    _createPost = (post, isPublished) => {
        const { userState } = this.props
        const formData = new FormData()
        formData.append('isPublished', JSON.stringify(isPublished))
        formData.append('category', post.category)
        formData.append('coverImgFile', post.coverImgFile)
        formData.append('title', post.title)
        formData.append('intro', post.intro)
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('contentState', JSON.stringify(post.contentState))        
        return fetchCreator('/api/admin/posts', {
            method : "POST",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            },
            body : formData
        })
    }

    _updatePost = (post) => {
        const formData = new FormData()
        if(post.coverImgFile){
            formData.append('coverImgFile', post.coverImgFile)
        } else {
            formData.append('isMaintainingCover', post.isMaintainingCover || false)
        }
        formData.append('isPublished', post.isPublished)
        formData.append('category', post.category)
        formData.append('title', post.title)
        formData.append('intro', post.intro)
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('contentState', JSON.stringify(post.contentState))
        const post_id = this.props.match.params.post_id
        const { userState } = this.props
        return fetchCreator(`/api/admin/posts/${post_id}`, {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            },
            body : formData
        })      
    }

    _fetchNewPost = async (post, isPublished) => {
        const responseContainingPost = await this._createPost(post, isPublished)
        if(!responseContainingPost){ return }
        if(!isPublished){ return alert('save success') }
        
        const responseContainingPosts = await this._getPosts()
        if(!responseContainingPosts){ return }
        
        const posts = responseContainingPosts.posts.map((post) => {
            post.description = draftToHtml(post.contentState)
            delete post.contentState
            return post
        })
        const comments = responseContainingPosts.comments
        const replies = responseContainingPosts.replies

        this.props.postsReceived({
            posts,
            comments,
            replies,
            date : Date.now()
        })
        history.push(`/post/${responseContainingPost.post._id}`) 
    }

    _fetchEditedPost = async (post) => {
        const response = await this._updatePost(post)
        if(!response){ return }
        if(!post.isPublished){ return alert('save success') }
        
        const responseContainingPosts = await this._getPosts()
        if(!responseContainingPosts){ return }

        const posts = responseContainingPosts.posts.map((post) => {
            post.description = draftToHtml(post.contentState)
            delete post.contentState
            return post
        })
        const comments = responseContainingPosts.comments
        const replies = responseContainingPosts.replies

        this.props.postsReceived({
            posts,
            comments,
            replies,
            date : Date.now()
        })
        const { post_id } = this.state
        history.push(`/post/${post_id}`) 
    }

    getPostForEdit = () => {
        const post_id = this.props.match.params.post_id
        const { userState } = this.props
        return fetchCreator(`/api/admin/posts/${post_id}`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`
            }
        })
    }

    render() {
        return ( 
            <PostEditor
            mode={this.state.mode}
            getPostForEdit={this.getPostForEdit}
            imgFileUploadCallback={this.imgFileUploadCallback}
            publish={(post) => this._fetchNewPost(post, true)}
            save={(post) => this._fetchNewPost(post, false)}
            edit={this._fetchEditedPost}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditorContainer)