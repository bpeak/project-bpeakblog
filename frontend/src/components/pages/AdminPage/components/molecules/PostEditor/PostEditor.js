import React, { Component, Fragment } from 'react'
import { EditorState, convertToRaw, ContentBlock, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
//components
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'
//styles
import './draft.css'
import classNames from 'classnames/bind'
import styles from './PostEditor.scss'
const cx = classNames.bind(styles)
//modules
import imgFileReader from '~modules/imgFileReader'
import tagController from '~modules/tagController'

class PostEditor extends Component {
    constructor(props){
        super(props)
        const mode = props.match.params.mode
        this.state = {
            mode,
            isLoaded : mode === 'edit' ? false : true,
            cover : undefined,
            tags : [],
            editorState : EditorState.createEmpty(),
            contentState : undefined,
            raw : undefined
        }
    }

    _setCover = (cover) => { this.setState(() => ({ cover }))}
    _setTags = (tags) => { this.setState(() => ({ tags }) )}
    _setContentState = (contentState) => { this.setState(() => ({ contentState }))}
    _setEditorState = (editorState) => { this.setState(() => ({ editorState })) }

    _handleOnSelectCoverClick = () => { this.refs.cover.click() }
    _handleOnDeleteCoverClick = () => { this.setState(() => ({ cover : null }))}
    _handleOnEditorStateChange = (editorState) => { this._setEditorState(editorState) }

    _handleOnInputCoverChange = async () => {
        const coverImgFile = this.refs.cover.files[0]
        const coverImgDataUrl = await imgFileReader(coverImgFile)
        const cover = { imgFile : coverImgFile, imgSrc : coverImgDataUrl }
        this._setCover(cover)
    }
    _handleOnTextareaTagsChange = (e) => {
        const value = e.currentTarget.value
        const hashtags = tagController.extract(value)
        const tags = tagController.getTagsFromHashtags(hashtags)
        this._setTags(tags)
    }

    _handleOnPublishClick = () => {
        const coverImgFile = this.state.cover ? this.state.cover.imgFile : null
        const category = this.refs.category.value
        const title = this.refs.title.value
        const intro = this.refs.intro.value
        const tags = this.state.tags
        const contentState = convertToRaw(this.state.editorState.getCurrentContent())
        this.props.publish({
            coverImgFile,
            category,
            title,
            intro,
            tags,
            contentState
        })
    }

    _handleOnSaveClick = () => {
        const coverImgFile = this.state.cover ? this.state.cover.imgFile : null
        const category = this.refs.category.value
        const title = this.refs.title.value
        const intro = this.refs.intro.value
        const tags = this.state.tags
        const contentState = convertToRaw(this.state.editorState.getCurrentContent())
        this.props.save({
            coverImgFile,
            category,
            title,
            intro,
            tags,
            contentState
        })        
    }

    _handleOnEditClick = () => {
        const isPublished = this.refs.isPublished.checked
        const category = this.refs.category.value
        const title = this.refs.title.value
        const intro = this.refs.intro.value
        const tags = this.state.tags
        const contentState = convertToRaw(this.state.editorState.getCurrentContent())
        const post = {
            isPublished,
            category,
            title,
            intro,
            tags,
            contentState
        }
        const cover = this.state.cover
        if(cover && cover.imgFile){ 
            post.coverImgFile = cover.imgFile
        }
        if(cover && !cover.imgFile && cover.imgSrc){
            post.isExistCoverImg = true
        }
        if(!cover){
            post.isExistCoverImg = false
        }
        this.props.edit(post)        
    }

    async componentDidMount(){
        const { mode } = this.state
        if(mode !== 'edit') { return }
        const post_id = this.props.match.params.post_id
        const response = await this.props.getPostForEdit()
        if(!response) { return }
        const { post } = response
        const category = post.category
        const title = post.title
        const intro = post.intro
        const tags = post.tags
        const hashtags = tags.map((tag) => { return '#' + tag })
        const joinedTextTags = hashtags.join(" ")

        this.refs.category.value = category
        this.refs.title.value = title
        this.refs.intro.value = intro
        this.refs.tags.value = joinedTextTags
        this.refs.isPublished.checked = post.isPublished
        if(post.coverImgSrc){ this.setState(() => ({ cover : { imgSrc : post.coverImgSrc }}))}
        this._setTags(tags)
        this._setEditorState(EditorState.createWithContent(convertFromRaw(post.contentState)))
        this.setState(() => ({ isLoaded : true }))
    }

    render() {
        const { 
            imgFileUploadCallback
        } = this.props
        const { 
            _handleOnSelectCoverClick,
            _handleOnDeleteCoverClick,
            _handleOnInputCoverChange,
            _handleOnTextareaTagsChange,
            _handleOnSaveClick,
            _handleOnPublishClick,
            _handleOnEditClick,
            _handleOnEditorStateChange
         } = this
        const { 
            isLoaded,
            cover,
            tags,
            editorState
         } = this.state

        return (
            <div className={cx('PostEditor', { 'loading' : !isLoaded })}>
                { !isLoaded && <div className={cx('spinner-container')}><LargeSpinner/></div> }
                { cover && <img className={cx('coverPreview')} src={cover.imgSrc}/> }
                <input
                className={cx('cover')}
                ref="cover"
                type="file" accept="image/*"
                onChange={_handleOnInputCoverChange}/>
                <div className={cx('btns-cover')}>
                    <button 
                    className={cx('selectCover')}
                    onClick={_handleOnSelectCoverClick} >
                    { cover ? "커버이미지 변경" : "커버이미지 선택"}
                    </button>
                    { cover && 
                    <button
                    className={cx('deleteCover')}
                    onClick={_handleOnDeleteCoverClick}>
                    커버이미지 삭제
                    </button>}      
                </div>
                <select className={cx('category')} ref="category" name="category" defaultValue="">
                    <option disabled value="">select category</option>
                    <option value="dev">dev</option>
                    <option value="life">life</option>
                </select>                
                <input
                className={cx('title')} ref="title" type="text" placeholder="title"/>
                <textarea className={cx('intro')} ref="intro" placeholder="intro"></textarea>
                { tags.length !== 0 &&
                <div className={cx('tags')}>{tags.map((tag, index) => {
                    return <span key={index}>{tag}</span>
                })}</div>}
                <textarea onChange={_handleOnTextareaTagsChange} className={cx('tags')} ref="tags" placeholder="tags"></textarea>
                <Editor
                editorState={editorState}
                onEditorStateChange={_handleOnEditorStateChange}
                // onEditorStateChange={(EditorState) => {
                //     console.log(EditorState.getCurrentContent().createFromBlockArray
                //     )
                // }}
                // onContentStateChange={_handleOnContentStateChange}
                toolbar={{
                    inline: { inDropdown: false },
                    list: { inDropdown: false },
                    textAlign: { inDropdown: false },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { 
                        uploadCallback : imgFileUploadCallback,
                        alt: { present: true, mandatory: true },
                        previewImage: true
                    },
                }}        
                />
                {this.state.mode === 'write' &&
                <div className={cx('btns')}>
                    <button  className={cx('publish')} onClick={_handleOnPublishClick}>PUBLISH</button>
                    <button className={cx('save')} onClick={_handleOnSaveClick}>SAVE</button>
                </div>}
                {this.state.mode === 'edit' &&
                <Fragment>
                    <div className={cx('isPublished-container')}>
                        <span>Do you want to publish?</span>
                        <input ref="isPublished" type="checkbox" name="isPublished"/>
                    </div>
                    <button className={cx('edit')} onClick={_handleOnEditClick}>EDIT</button>
                </Fragment>}
            </div>
        )
    }
}

export default PostEditor