import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
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
        this.state = {
            isLoaded : props.mode === 'edit' ? false : true,
            isPublished : false,
            cover : null,
            category : '',
            title : '',
            intro : '',
            tags : [],
            tagsOriginalString : '',
            editorState : EditorState.createEmpty(),
        }
    }

    _setCover = (cover) => { this.setState(() => ({ cover }))}
    _setCategory = (category) => { this.setState(() => ({ category }))}
    _setTitle = (title) => { this.setState(() => ({ title }))}
    _setIntro = (intro) => { this.setState(() => ({ intro }))}
    _setTags = (tags) => { this.setState(() => ({ tags }) )}
    _setTagsOriginalString = (tagsOriginalString) => { this.setState(() => ({ tagsOriginalString }))}
    _setEditorState = (editorState) => { this.setState(() => ({ editorState })) }
    _setIsPublished = (isPublished) => { this.setState(() => ({ isPublished }))}
    _setIsLoaded = (isLoaded) => { this.setState(() => ({ isLoaded }))}

    _handleOnSelectCoverClick = () => { this.refs.cover.click() }
    _handleOnDeleteCoverClick = () => { this._setCover(null) }
    _handleOnInputCoverChange = async () => {
        const coverImgFile = this.refs.cover.files[0]
        const coverImgDataUrl = await imgFileReader(coverImgFile)
        const cover = { imgFile : coverImgFile, imgSrc : coverImgDataUrl }
        this._setCover(cover)
    }
    _handleOnSelectBoxCategoryChange = (e) => {
        const category = e.currentTarget.value
        this._setCategory(category)
    }
    _handleOnTitleChange = (e) => {
        const title = e.currentTarget.value
        this._setTitle(title)
    }
    _handleOnTextareaTagsChange = (e) => {
        const tagsOriginalString = e.currentTarget.value
        const hashtags = tagController.extract(tagsOriginalString)
        const tags = tagController.getTagsFromHashtags(hashtags)
        this._setTagsOriginalString(tagsOriginalString)
        this._setTags(tags)
    }
    _handleOnInputIntroChange = (e) => {
        const intro = e.currentTarget.value
        this._setIntro(intro)
    }
    _handleOnEditorStateChange = (editorState) => { this._setEditorState(editorState) }
    _handleOnInputPublishChange = () => { this._setIsPublished(!this.state.isPublished) }
    _handleOnPublishClick = () => {
        const {
            cover,
            category,
            title,
            intro,
            tags,
            editorState
        } = this.state

        if(!category || !title){ return alert('카테고리와 타이틀은 필수항목입니다.') }

        if(!cover){
            const result = confirm('커버이미지 없이 진행하시겠습니까?')
            if(!result){ return }
        }

        const contentState = convertToRaw(editorState.getCurrentContent())
        this.props.publish({
            coverImgFile : cover ? cover.imgFile : null,
            category,
            title,
            intro,
            tags,
            contentState,
        })
    }

    _handleOnSaveClick = () => {
        const {
            cover,
            category,
            title,
            intro,
            tags,
            editorState
        } = this.state

        if(!category || !title){ return alert('카테고리와 타이틀은 필수항목입니다.') }

        if(!cover){
            const result = confirm('커버이미지 없이 진행하시겠습니까?')
            if(!result){ return }
        }

        const contentState = convertToRaw(editorState.getCurrentContent())

        this.props.save({
            coverImgFile : cover ? cover.imgFile : null,
            category,
            title,
            intro,
            tags,
            contentState,
        })     
    }

    _handleOnEditClick = () => {
        const {
            cover,
            category,
            title,
            intro,
            tags,
            editorState,
            isPublished,
        } = this.state

        if(!category || !title){ return alert('카테고리와 타이틀은 필수항목입니다.') }

        if(!cover){
            const result = confirm('커버이미지 없이 진행하시겠습니까?')
            if(!result){ return }
        }

        const contentState = convertToRaw(editorState.getCurrentContent())

        const post = {
            isPublished,
            category,
            title,
            intro,
            tags,
            contentState
        }

        if(cover && cover.imgFile){
            post.coverImgFile = cover.imgFile
        }
        if(cover && !cover.imgFile && cover.imgSrc){
            post.isMaintainingCover = true
        }
        this.props.edit(post)        
    }

    async componentDidMount(){
        if(this.props.mode !== 'edit') { return }
        const response = await this.props.getPostForEdit()
        if(!response) { return }
        const { post } = response
        const hashtags = post.tags.map((tag) => { return '#' + tag })
        const tagsOriginalString = hashtags.join(" ")

        this._setCategory(post.category)
        this._setTitle(post.title)
        this._setIntro(post.intro)
        this._setTags(post.tags)
        this._setTagsOriginalString(tagsOriginalString)
        this._setIsPublished(post.isPublished)
        this._setEditorState(EditorState.createWithContent(convertFromRaw(post.contentState)))
        if(post.coverImgSrc){ this.setState(() => ({ cover : { imgSrc : post.coverImgSrc }}))}
        this._setIsLoaded(true)
    }

    render() {
        const { 
            mode,
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
            _handleOnEditorStateChange,
            _handleOnInputIntroChange,
            _handleOnSelectBoxCategoryChange,
            _handleOnTitleChange,
            _handleOnInputPublishChange,
         } = this
        const { 
            isLoaded,
            cover,
            category,
            title,
            intro,
            tags,
            tagsOriginalString,
            editorState,
            isPublished,
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
                <select 
                    className={cx('category')}
                    onChange={_handleOnSelectBoxCategoryChange}
                    name="category" 
                    value={category}>
                    <option disabled value="">select category</option>
                    <option value="dev">dev</option>
                    <option value="life">life</option>
                </select>                
                <input
                    className={cx('title')} 
                    onChange={_handleOnTitleChange}
                    value={title}
                    type="text" 
                    placeholder="title"/>
                <textarea 
                    className={cx('intro')} 
                    onChange={_handleOnInputIntroChange}
                    value={intro}
                    placeholder="intro">
                </textarea>
                { tags.length !== 0 &&
                <div className={cx('tags')}>{tags.map((tag, index) => {
                    return <span key={index}>{tag}</span>
                })}</div>}
                <textarea 
                    className={cx('tags')} 
                    value={tagsOriginalString}
                    onChange={_handleOnTextareaTagsChange} 
                    placeholder="tags">
                </textarea>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={_handleOnEditorStateChange}
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
                    }}/>
                {mode === 'write' &&
                <div className={cx('btns')}>
                    <button  className={cx('publish')} onClick={_handleOnPublishClick}>PUBLISH</button>
                    <button className={cx('save')} onClick={_handleOnSaveClick}>SAVE</button>
                </div>}
                {mode === 'edit' &&
                <Fragment>
                    <div className={cx('isPublished-container')}>
                        <span>Do you want to publish?</span>
                        <input
                            onChange={_handleOnInputPublishChange}
                            checked={isPublished}
                            type="checkbox" 
                            name="isPublished"/>
                    </div>
                    <button className={cx('edit')} onClick={_handleOnEditClick}>EDIT</button>
                </Fragment>}
            </div>
        )
    }
}

PostEditor.propTypes = {
    mode : PropTypes.string.isRequired,
    getPostForEdit : PropTypes.func.isRequired,
    imgFileUploadCallback : PropTypes.func.isRequired,
    publish : PropTypes.func.isRequired,
    save : PropTypes.func.isRequired,
    edit : PropTypes.func.isRequired,
}

export default PostEditor