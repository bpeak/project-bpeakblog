import React from 'react'
import PropTypes from 'prop-types'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
//styles
import classNames from 'classnames/bind'
import styles from './VisitorCard.scss'
const cx = classNames.bind(styles)

const VisitorCard = ({
    isMember,
    isAdmin,
    nick,
    profileImgSrc,
    description,
    createdDate
}) => {
    return (
        <div className={cx('VisitorCard', { 'admin' : isAdmin }, { 'member' : isMember } )}>
            <div className={cx('user')}>
                <div className={cx('profileImg-container')}>
                    <ProfileImg isMember={isMember} imgSrc={profileImgSrc}/>
                </div>
                <span className={cx('nick')}>{nick}</span>
            </div>
            <div className={cx('description')}>{description}</div>
            <div className={cx('date-container')}>
                <div className={cx('date')}>{"3일전"}</div>
            </div>
        </div>  
    )
}

VisitorCard.propTypes = {
    isMember : PropTypes.bool.isRequired,
    isAdmin : PropTypes.bool.isRequired,
    nick : PropTypes.string.isRequired,
    profileImgSrc : PropTypes.string,
    description : PropTypes.string.isRequired,
    createdDate : PropTypes.string.isRequired
}

export default VisitorCard