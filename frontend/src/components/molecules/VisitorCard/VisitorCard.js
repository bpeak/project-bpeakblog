import React from 'react'
import PropTypes from 'prop-types'
//modules
import dateConverter from '~modules/dateConverter'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
//styles
import classNames from 'classnames/bind'
import styles from './VisitorCard.scss'
const cx = classNames.bind(styles)

const VisitorCard = ({
    _id,
    isMember,
    isAdmin,
    nick,
    profileImgSrc,
    description,
    createdDate,
    userState,
    deleteVisitorCard,
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
                {userState.isAdmin && <button onClick={() => deleteVisitorCard(_id)} className={cx('delete')}>삭제</button>}
                <div className={cx('date')}>{dateConverter.getTimeAgoStamp(createdDate)}</div>
            </div>
        </div>  
    )
}

VisitorCard.propTypes = {
    _id : PropTypes.number.isRequired,
    isMember : PropTypes.bool.isRequired,
    isAdmin : PropTypes.bool.isRequired,
    nick : PropTypes.string.isRequired,
    profileImgSrc : PropTypes.string,
    description : PropTypes.string.isRequired,
    createdDate : PropTypes.string.isRequired,
    userState : PropTypes.object.isRequired,
    deleteVisitorCard : PropTypes.func.isRequired,
}

export default VisitorCard