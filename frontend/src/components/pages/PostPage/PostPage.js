import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
//modules
import getImgSizeFromSrc from '~modules/getImgSizeFromSrc'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './PostPage.scss'
const cx = classNames.bind(styles)

class PostPage extends Component {
    constructor(props){
        super(props)
        const _id = props.match.params._id
        const posts = props.posts
        const post = (function(){
            if(!posts) { return undefined }
            const currentPostIndex = posts.findIndex(post => Number(post._id) === Number(_id))
            const post = currentPostIndex === -1 ? null : posts[currentPostIndex]
            return post
        })()
        this.state = { post, coverImgHeight : undefined }
    }

    _setPost = (post) => { this.setState(() => ({ post }))}
    _setCoverImgHeight = (coverImgHeight) => { this.setState(() => ({ coverImgHeight }))}

    _handleOnWindowResize = () => {
        const coverImgContainer = this.refs.coverImgContainer
        const coverImgContainerRect = coverImgContainer.getBoundingClientRect()
        const coverImgContainerWidth = coverImgContainerRect.width
        const coverImgHeight = coverImgContainerWidth * this.coverImgRatio
        this._setCoverImgHeight(coverImgHeight)
    }

    _isoDateToTimeText = (isoDate) => {
        const date = new Date(isoDate)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const timeText = `${year}년 ${month}월 ${day}일`
        return timeText
    }

    shouldComponentUpdate(nextProps, nextState){
        const prevPost = this.state.post
        const nextPost = nextState.post
        const prevCoverImgHeight = this.state.coverImgHeight
        const nextCoverImgHeight = nextState.coverImgHeight
        return ( (prevPost !== nextPost) || (prevCoverImgHeight !== nextCoverImgHeight) )
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
        const { post } = this.state
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
        const { _isoDateToTimeText } = this
        return (
            <MainTemplate title={"d"}>
                <div className={cx('PostPage')}>
                    {post === undefined ? <div className={cx('spinne-container')}><LargeSpinner/></div>
                    :<Fragment>
                    {post === null ? <div>존재하지 않는 포스트입니다</div>
                    
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
                        <div className={cx('tags')}></div>
                    </article>}
                    
                    </Fragment>}
                </div>                
            </MainTemplate>
        )
    }
}

export default PostPage

