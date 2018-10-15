import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//modules
import history from '~modules/history'
//imgs
import coverDefaultImgSrc from '~assets/fullLogo.png'
//styles
import classNames from 'classnames/bind'
import styles from './PostHoriCard.scss'
const cx = classNames.bind(styles)

class PostHoriCard extends React.PureComponent {
    _handleOnShowPostClick = () => {
        const post_id = this.props.post._id
        history.push(`/post/${post_id}`)
    }

    _handleOnAuthorClick = () => {
        history.push('/AboutMe')
    }

    render() {

        const { 
            _handleOnShowPostClick, 
            _handleOnAuthorClick
        } = this
        const { post } = this.props

        return (
            <div className={cx('PostHoriCard')}>
                {!post ? <div className={cx('spinner-container')}><SmallSpinner/></div> 
                :<Fragment>
                <div className={cx('contents')}>
                    <div className={cx('title')} onClick={_handleOnShowPostClick}>{post.title}</div>
                    <div className={cx('intro')} onClick={_handleOnShowPostClick}>{post.intro}</div>
                    <div className={cx('authorAndDate')}>
                        <div className={cx('ProfileImg-container')}>
                            <ProfileImg onClick={_handleOnAuthorClick} imgSrc={post.author.profileImgSrc} isMember={true}/>
                        </div>
                        <span className={cx('nick')} onClick={_handleOnAuthorClick}>{post.author.nick}</span>
                    </div>
                </div>
                <img 
                className={cx('cover')}
                onClick={_handleOnShowPostClick}
                src={post.coverImgSrc || coverDefaultImgSrc}
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