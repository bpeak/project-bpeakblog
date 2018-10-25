import React, { Component } from 'react'
import PropTypes from 'prop-types'
//imgs
import coverDefaultImgSrc from '~assets/fullLogo.png'
//styles
import classNames from 'classnames/bind'
import styles from './PostCard.scss'
const cx = classNames.bind(styles)
//modules
import dateConverter from '~modules/dateConverter'
import getImgSizeFromSrc from '~modules/getImgSizeFromSrc'
import history from '~modules/history'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'

class PostCard extends Component {

    _handleOnAuthorClick = () => { history.push('/AboutMe') }
    _handleOnShowPostClick = () => {
        const post_id = this.props._id
        history.push(`/post/${post_id}`)
    }

    render() {
        const {
            _handleOnAuthorClick,
            _handleOnShowPostClick,
        } = this

        const { 
            isPublished,
            author, 
            category, 
            coverImgSrc, 
            title, 
            intro, 
            tags, 
            createdDate,
        } = this.props

        return (
            <div className={cx('PostCard', { unPublished : !isPublished })}>
                <img className={cx('cover')} onClick={_handleOnShowPostClick} src={coverImgSrc}></img>

                <div className={cx('contents')}>

                    <div className={cx('categoryAndDate')}>
                        <span className={cx('category', category)}>{category}</span>
                        <div className={cx('date')}>
                            <i className="far fa-calendar-alt"></i>
                            <span>{dateConverter.getFullTimeStamp(createdDate)}</span>
                        </div>
                    </div>

                    <div className={cx('title')} onClick={_handleOnShowPostClick}>
                        <h2>{title}</h2>
                    </div>

                    <div className={cx('intro')}  onClick={_handleOnShowPostClick}>
                        {intro}
                    </div>

                    <div className={cx('author')}>
                        <div className={cx('profileImg-container')} onClick={_handleOnAuthorClick}>
                            <ProfileImg imgSrc={author.profileImgSrc} isMember={true}/>
                        </div>
                        <span onClick={_handleOnAuthorClick} className={cx('nick')}>{author.nick}</span>
                    </div>

                </div>
            </div>
        )
    }
}

PostCard.propTypes = {
    isPublished : PropTypes.bool.isRequired,
    _id : PropTypes.number.isRequired,
    author : PropTypes.object.isRequired,
    category : PropTypes.string.isRequired,
    coverImgSrc : PropTypes.string,
    title : PropTypes.string.isRequired,
    intro : PropTypes.string.isRequired,
    tags : PropTypes.array.isRequired,
    createdDate : PropTypes.string.isRequired,
}

PostCard.defaultProps = {
    coverImgSrc : coverDefaultImgSrc
}

export default PostCard

