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
    user : state.user
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
            // text
        }
    }

    _uploadPostImgFile = (imgFile) => {
        const formData = new FormData()
        formData.append('imgFile', imgFile)
        const { user } = this.props
        return fetchCreator('/api/admin/postImgFile', {
            method : "POST",
            headers : {
                Authorization : `Bearer ${user.token}`,
            },            
            body : formData
        })
    }

    imgFileUploadCallback = async (imgFile) => {
        try{
            const response = await this._uploadPostImgFile(imgFile)
            if(!response) { return }
            return ({ data : { link : response.fileTemporaryPath } })
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
        const { user } = this.props
        const formData = new FormData()
        formData.append('isPublished', isPublished)
        formData.append('category', post.category)
        formData.append('coverImgFile', post.coverImgFile)
        formData.append('title', post.title)
        formData.append('intro', post.intro)
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('contentState', JSON.stringify(post.contentState))        
        return fetchCreator('/api/admin/post', {
            method : "POST",
            headers : {
                Authorization : `Bearer ${user.token}`,
            },
            body : formData
        })
    }

    _editPost = (post, isPublished) => {
        // const { user } = this.props
        // const formDate = new 
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

    _updatePost = (post) => {
        const post_id = this.props.match.params.post_id
        const formData = new FormData()
        if(post.coverImgFile){ 
            formData.append('coverImgFile', post.coverImgFile) 
        } else {
            formData.append('isExistCoverImg', JSON.stringify(post.isExistCoverImg))
        }
        formData.append('isPublished', post.isPublished)
        formData.append('category', post.category)
        formData.append('title', post.title)
        formData.append('intro', post.intro)
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('contentState', JSON.stringify(post.contentState))
        const { user } = this.props
        return fetchCreator(`/api/admin/post/${post_id}`, {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${user.token}`,
            },
            body : formData
        })      
    }

    _fetchEditedPost = async (post) => {
        const response = await this._updatePost(post)
        if(!response){ return }
        if(!post.isPublished){ return alert('save success')}
        
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
        const { user } = this.props
        return fetchCreator(`/api/admin/post/${post_id}`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        })
    }

    componentDidMount(){
    
    }

    render() {
        return ( 
            <PostEditor
            mode={this.state.mode}
            match={this.props.match}
            imgFileUploadCallback={this.imgFileUploadCallback}
            getPostForEdit={this.getPostForEdit}
            publish={(post) => this._fetchNewPost(post, true)}
            save={(post) => this._fetchNewPost(post, false)}
            edit={this._fetchEditedPost}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditorContainer)