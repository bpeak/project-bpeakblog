import React from 'react'
//styles
import classNames from 'classnames/bind'
import styles from './SocialErrorPage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

const SocialErrorPage = () => {
    return (
        <MainTemplate title="Social Login Error">
            <div className={cx('SocialErrorPage')}>
                <div className={cx('msg')}>ddddd</div>
            </div>
        </MainTemplate>
    )
}

export default SocialErrorPage