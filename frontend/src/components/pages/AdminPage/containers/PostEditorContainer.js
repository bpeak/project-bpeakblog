import React, { Component } from 'react'
import { connect } from 'react-redux'
//modules
import fetchCreator from '~modules/fetchCreator'
import imgFileReader from '~modules/imgFileReader'
//admin components
import PostEditor from '../components/molecules/PostEditor/PostEditor'

const modeTypes = { edit : 'edit', write : 'write' }

const mapStateToProps = (state) => ({
    userState : state.user
})

class PostEditorContainer extends Component {
    constructor(props){
        super(props)
        const mode = props.match.params.mode
        this.state = {
            mode,
            post_id : mode === modeTypes.write ? undefined : props.match.params.post_id,
            cover : null,
            title : '',
            intro : '',
            // text
        }
    }

    _imgFileReader = (file) => {
        return new Promise(resolve => {
            const reader  = new FileReader()
            reader.addEventListener("load", () => {
                const src = reader.result
                resolve(src)
            }, false)
            reader.readAsDataURL(file)
        })
    }

    _uploadPostImg = (imgFile) => {
        const formData = new FormData()
        formData.append('imgFile', imgFile)
        return fetchCreator('/api/admin/postImgFile', {
            method : "POST",
            body : formData
        })
    }

    _sendPostImgFile = (imgFile, imgDataUrl) => {
        const formData = new FormData()
        formData.append('imgFile', imgFile)
        formData.append('imgDataUrl', imgDataUrl)
        return fetchCreator('/api/admin/postImgFile', {
            method : "POST",
            body : formData
        })
    }

    imgFileUploadCallback = async (imgFile) => {
        try{
            const imgDataUrl = await imgFileReader(imgFile)
            await this._sendPostImgFile(imgFile, imgDataUrl)
            console.log('돌려준다')
            return ({ data : { link : imgDataUrl } })
        }
        catch(err){
            console.log(err)
        }
    }

    _fetchNewPost = (post, isPublished) => {
        const formData = new FormData()
        formData.append('isPublished', isPublished)
        formData.append('category', post.category)
        formData.append('coverImgFile', post.coverImgFile)
        formData.append('title', post.title)
        formData.append('intro', post.intro)
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('contentState', JSON.stringify(post.contentState))
        const { userState } = this.props
        return fetchCreator('/api/admin/post', {
            method : "POST",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            },
            body : formData
        })      
    }

    _fetchEditedPost = (post) => {
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
        fetchCreator(`/api/admin/post/${post_id}`, {
            method : "PATCH",
            body : formData
        })      
    }

    getPostForEdit = () => {
        const post_id = this.props.match.params.post_id
        return fetchCreator(`/api/admin/post/${post_id}`, {
            method : "GET"
        })
    }

    render() {
        return ( 
            <PostEditor
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

export default connect(mapStateToProps, null)(PostEditorContainer)