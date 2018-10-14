import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//modules
import history from '~modules/history'
import getImgSizeFromSrc from '~modules/getImgSizeFromSrc'
import imgLoader from '~modules/imgLoader'
//imgs
import coverDefaultImgSrc from '~assets/nemo.png'
//styles
import classNames from 'classnames/bind'
import styles from './PostHoriCard.scss'
const cx = classNames.bind(styles)

class PostHoriCard extends React.PureComponent {
    state = {
        contentsHeight : undefined
    }

    _setContentsHeight = (contentsHeight) => { this.setState(() => ({ contentsHeight }))}
    
    _handleOnCoverImgLoad = () => {
        const coverImgHeight = this.refs.cover.clientHeight
        this._setContentsHeight(coverImgHeight)
    }

    _handleOnWindowResize = () => {
        const coverImgHeight = this.refs.cover.clientHeight
        this._setContentsHeight(coverImgHeight)
    }

    _handleOnShowPostClick = () => {
        const post_id = this.props.post._id
        history.push(`/post/${post_id}`)
    }

    componentDidMount(){
        window.addEventListener('resize', this._handleOnWindowResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._handleOnWindowResize)
    }

    render() {

        const {
            _handleOnCoverImgLoad,
            _handleOnShowPostClick
        } = this
        const { post } = this.props
        const { contentsHeight } = this.state

        return (
            <div className={cx('PostHoriCard')}>
                {!post ? <div className={cx('spinner-container')}><SmallSpinner/></div> 
                :<Fragment>
                <div className={cx('contents')} style={{ height : contentsHeight || 1}}>
                    {contentsHeight && 
                    <Fragment>
                    <div className={cx('title')} onClick={_handleOnShowPostClick}>{post.title}</div>
                    <div className={cx('intro')} onClick={_handleOnShowPostClick}>{post.intro}</div>
                    <div className={cx('authorAndDate')}>
                        <div className={cx('ProfileImg-container')}>
                            <ProfileImg imgSrc={post.author.profileImgSrc} isMember={true}/>
                        </div>
                        <span className={cx('nick')}>{post.author.nick}</span>
                    </div>
                    </Fragment>}
                </div>
                <img 
                    ref="cover"
                    className={cx('cover')}
                    onClick={_handleOnShowPostClick}
                    src={post.coverImgSrc || coverDefaultImgSrc}
                    onLoad={_handleOnCoverImgLoad}
                />
                </Fragment>}
            </div>
        )
    }
}

PostHoriCard.propTypes = {
    post : PropTypes.shape({
        _id : PropTypes.number.isRequired,
        author : PropTypes.object.isRequired,
        category : PropTypes.string.isRequired,
        coverImgSrc : PropTypes.string,
        title : PropTypes.string.isRequired,
        intro : PropTypes.string.isRequired,
        tags : PropTypes.array.isRequired,
        createdDate : PropTypes.string.isRequired
    })
}

export default PostHoriCard