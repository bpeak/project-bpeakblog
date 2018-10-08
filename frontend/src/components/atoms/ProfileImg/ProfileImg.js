import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
//imgs
import memberProfileDefaultImgSrc from '~assets/person.jpg'
import nonMemberProfileImgSrc from '~assets/anonymous.jpg'
//styles
import styles from './ProfileImg.scss'
const cx = classNames.bind(styles)

const ProfileImg = ({isMember, imgSrc}) => {

    const profileImgSrc = (function(){
        if(!isMember){
            return nonMemberProfileImgSrc
        } else {
            if(!imgSrc){
                return memberProfileDefaultImgSrc
            }
            return imgSrc
        }
    })()

    return ( <img className={cx('ProfileImg', { nonMember : !isMember })} src={profileImgSrc}/> )
}

ProfileImg.propTypes = {
    imgSrc : PropTypes.string,
    isMember : PropTypes.bool.isRequired
}

export default ProfileImg