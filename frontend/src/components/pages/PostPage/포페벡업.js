import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//modules
import getImgSizeFromSrc from '~modules/getImgSizeFromSrc'
import history from '~modules/history'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import PostComments from '~components/organisms/PostComments/PostComments'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './PostPage.scss'
const cx = classNames.bind(styles)

class PostPage extends Component {
    constructor(props){
        this.state = { coverImgHeight : undefined }
    }

    _setCoverImgHeight = (coverImgHeight) => { this.setState(() => ({ coverImgHeight }))}

    _handleOnWindowResize = () => {
        const coverImgContainer = this.refs.coverImgContainer
        const coverImgContainerRect = coverImgContainer.getBoundingClientRect()
        const coverImgContainerWidth = coverImgContainerRect.width
        const coverImgHeight = coverImgContainerWidth * this.coverImgRatio
        this._setCoverImgHeight(coverImgHeight)
    }

    _handleOnBtnTagClick = (e) => {
        const tag = e.currentTarget.id
        history.push(`/posts/tag?keyword=${tag}`)
    }

    _isoDateToTimeText = (isoDate) => {
        const date = new Date(isoDate)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const timeText = `${year}년 ${month}월 ${day}일`
        return timeText
    }

    async componentWillReceiveProps(nextProps){
        const posts = nextProps.posts
        if(!posts) { return }
        const _id = nextProps.match.params._id
        const nextPostIndex = posts.findIndex(post => Number(post._id) === Number(_id))
        const nextPost = nextPostIndex === -1 ? null :  posts[nextPostIndex]
        const prevPost = this.state.post
        if(prevPost !== nextPost){
            window.removeEventListener('resize', this._handleOnWindowResize)
            this.coverImgRatio = undefined
            this._setCoverImgHeight(undefined)

            if(nextPost === null) { return this._setPost(null) }
            
            this._setPost(nextPost)
            if(!nextPost.coverImgSrc) { return }
            //커버이미지 존재
            const coverImgSize = await getImgSizeFromSrc(nextPost.coverImgSrc)
            const coverImgRatio = coverImgSize.height / coverImgSize.width
            this.coverImgRatio = coverImgRatio
            window.addEventListener('resize', this._handleOnWindowResize)
            const coverImgContainer = this.refs.coverImgContainer
            const coverImgContainerRect = coverImgContainer.getBoundingClientRect()
            const coverImgContainerWidth = coverImgContainerRect.width
            const coverImgHeight = coverImgContainerWidth * coverImgRatio
            this._setCoverImgHeight(coverImgHeight)
        }
    }

    async componentDidMount(){
        const { post } = this.props
        if(!post || !post.coverImgSrc) { return }
        //커버이미지 존재
        const coverImgSize = await getImgSizeFromSrc(post.coverImgSrc)
        const coverImgRatio = coverImgSize.height / coverImgSize.width
        this.coverImgRatio = coverImgRatio
        window.addEventListener('resize', this._handleOnWindowResize)
        const coverImgContainer = this.refs.coverImgContainer
        const coverImgContainerRect = coverImgContainer.getBoundingClientRect()
        const coverImgContainerWidth = coverImgContainerRect.width
        const coverImgHeight = coverImgContainerWidth * coverImgRatio
        this._setCoverImgHeight(coverImgHeight)
    }

    componentWillUnmount(){ window.removeEventListener('resize', this._handleOnWindowResize) }

    render() {
        const { post } = this.state
        const { coverImgHeight } = this.state
        const { 
            _isoDateToTimeText,
            _handleOnBtnTagClick
        } = this

        return (
            <MainTemplate title={post && post.title}>
                <div className={cx('PostPage')}>
                    {post === undefined ? <div className={cx('spinner-container')}><LargeSpinner/></div>
                    :<Fragment>
                    {post === null ? <div className={cx('postNull-container')}>존재하지 않는 포스트입니다</div>
                    
                    : <article className={cx('post')}>
                        <div className={cx('authorAndDate')}>
                            <div className={cx('ProfileImg-container')}>
                                <ProfileImg isMember={true} imgSrc={post.author.profileImgSrc}/>
                            </div> 
                            <div className={cx('nickAndDate')}>
                                <span className={cx('nick')}>{post.author.nick}</span>
                                <span className={cx('date')}>{_isoDateToTimeText(post.createdDate)}</span>
                            </div>
                        </div>
                        <div className={cx('title')}>{post.title}</div>
                        {post.coverImgSrc && 
                        <div 
                        className={cx('coverImg-container')} 
                        style={{ height : coverImgHeight || 1 }} 
                        ref="coverImgContainer">
                        {coverImgHeight && <img src={post.coverImgSrc}/>}
                        </div>}
                        <div className={cx('intro')}>{post.intro}</div>
                        <div className={cx('description')} dangerouslySetInnerHTML={ {__html: post.description } }></div>
                        <div className={cx('tags')}>
                        {[...post.tags, ...post.tags,...post.tags, ...post.tags].map((tag, index) => {
                                return <button id={tag} onClick={_handleOnBtnTagClick} key={index}>{tag}</button>
                        })}       
                        </div>
                        <div className={cx('comments')}>
                            <PostComments 
                            post_id={post._id}
                            comments={post.comments}
                            />
                        </div>
                    </article>}
                    
                    </Fragment>}
                </div>                
            </MainTemplate>
        )
    }
}

PostPage.propTypes = {
    post : PropTypes.oneOfType([PropTypes.shape({
        _id : PropTypes.object.isRequired
    }), PropTypes.null])
}

export default PostPage

