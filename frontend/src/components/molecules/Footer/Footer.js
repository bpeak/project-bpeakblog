import React from 'react'
import { Link } from 'react-router-dom'
//assets
import logoImgSrc from '~assets/logo.png'
//style
import classNames from 'classnames/bind'
import styles from './style.scss'
const cx = classNames.bind(styles)

const Footer = () => {
    return (
        <div className={cx('Footer')}>
            <Link className={cx('logo')} to="/">
                <img src={logoImgSrc}/>
                <span>BPEAK BLOG</span>
            </Link>
            <div className={cx('copyright')}>Copyright © 2018. Bpeak(Kim Kihyun). All right reserved.</div>
        </div>
    )
}

export default Footer