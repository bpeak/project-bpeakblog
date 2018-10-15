import React, { Component } from 'react'
import PropTypes from 'prop-types'
//imgs
import coverDefaultImgSrc from '~assets/fullLogo.png'
//styles
import classNames from 'classnames/bind'
import styles from './PostCard.scss'
const cx = classNames.bind(styles)
//modules
import isoDateToTimeText from '~modules/isoDateToTimeText'
import getImgSizeFromSrc from '~modules/getImgSizeFromSrc'
import history from '~modules/history'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'

class PostCard extends Component {
    constructor(){
        super()
        this.state = {
            isLoaded : false,
            postCardHeight : undefined,
            coverImgHeight : undefined
        }
    }

    _postCardRatio = 1.52
    _postCardDefaultHeight = 400

    _setPostCardHeight = (postCardHeight) => { this.setState(() => ({ postCardHeight }))}
    _setCoverImgHeight = (coverImgHeight) => { this.setState(() => ({ coverImgHeight }))}
    _setIsLoaded = (isLoaded) => { this.setState(() => ({ isLoaded }))}

    _handleOnWindowReSize = () => {
        const postCard = this.refs.postCard
        const postCardRect = postCard.getBoundingClientRect()
        const postCardWidth = postCardRect.width
        const postCardHeight = postCardWidth * this._postCardRatio
        const coverImgRatio = this.coverImgRatio
        const coverImgWidth = postCardWidth
        const coverImgHeight = coverImgWidth * coverImgRatio  
        this._setPostCardHeight(postCardHeight)
        this._setCoverImgHeight(coverImgHeight)
    }

    _handleOnShowPostClick = () => {
        const post_id = this.props._id
        history.push(`/post/${post_id}`)
    }

    async componentDidMount(){
        const postCard = this.refs.postCard
        const postCardRect = postCard.getBoundingClientRect()
        const postCardWidth = postCardRect.width
        const postCardHeight = postCardWidth * this._postCardRatio
        const coverImgSize = await getImgSizeFromSrc(this.props.coverImgSrc)
        const coverImgRatio = coverImgSize.height / coverImgSize.width
        this.coverImgRatio = coverImgRatio
        const coverImgWidth = postCardWidth
        const coverImgHeight = coverImgWidth * coverImgRatio
        window.addEventListener('resize', this._handleOnWindowReSize)
        this._setPostCardHeight(postCardHeight)
        this._setCoverImgHeight(coverImgHeight)
        this._setIsLoaded(true)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._handleOnWindowReSize)
    }

    render() {
        const { 
            _handleOnShowPostClick,
            _postCardDefaultHeight
        } = this
        const { isLoaded, 
            postCardHeight,
            coverImgHeight 
        } = this.state
        const { 
            author, 
            category, 
            coverImgSrc, 
            title, 
            intro, 
            tags, 
            createdDate 
        } = this.props

        return (
            <div 
            className={cx('PostCard-wrapper')}
            style={{ height : postCardHeight || _postCardDefaultHeight }}
            ref="postCard">
                {!isLoaded ? <div className={cx('spinner-container')}><SmallSpinner/></div> 
                : <article className={cx('PostCard')}>
                    <div className={cx('coverImg-container')} onClick={_handleOnShowPostClick} style={{ height : coverImgHeight }}><img src={coverImgSrc}/></div>
                    <div style={{ height : postCardHeight - coverImgHeight }} className={cx('contents')}>
                        <div className={cx('categoryAndDate')}>
                            <span className={cx('category')}>{category}</span>
                            <div className={cx('date')}><i className="far fa-calendar-alt"></i><span>{isoDateToTimeText(createdDate)}</span></div>
                        </div>
                        <div className={cx('title')} onClick={_handleOnShowPostClick}>
                            <h2>{title}</h2>
                        </div>
                        <div className={cx('intro')}  onClick={_handleOnShowPostClick}>{intro}</div>
                        <div className={cx('author')}>
                            <div className={cx('profileImg-container')}>
                                <ProfileImg imgSrc={author.profileImgSrc} isMember={true}/>
                            </div>
                            <span onClick={() => history.push('/AboutMe')} className={cx('nick')}>{author.nick}</span>
                        </div>
                    </div>
                </article>}
            </div>
        )
    }
}

PostCard.propTypes = {
    _id : PropTypes.number.isRequired,
    author : PropTypes.object.isRequired,
    category : PropTypes.string.isRequired,
    coverImgSrc : PropTypes.string,
    title : PropTypes.string.isRequired,
    intro : PropTypes.string.isRequired,
    tags : PropTypes.array.isRequired,
    createdDate : PropTypes.string.isRequired
}

PostCard.defaultProps = {
    coverImgSrc : coverDefaultImgSrc
}

export default PostCard

