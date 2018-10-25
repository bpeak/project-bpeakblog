import React, { Component, Fragment } from 'react'
import classNames from 'classnames/bind'
import { Link, NavLink } from 'react-router-dom'
//modules
import history from '~modules/history'
//imgs
import logoImgSrc from '~assets/logo.png'
import hamburgerImgSrc from '~assets/hamburger.png'
import kakaoImgSrc from '~assets/kakao.png'
import naverImgSrc from '~assets/naver.png'
//styles
import styles from './MainHeader.scss'
const cx = classNames.bind(styles)
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'

const MainHeader = (props) => {
    const { 
        userState,
        openModalBlogMenu,
        recordPathBeforeEnteringAuthPage,
        deviceType
    } = props

    const _onSocialLoginClick = (e) => {
        e.preventDefault()
        const currentPathName = window.location.pathname
        const currentQueryParams = decodeURIComponent(window.location.search)
        recordPathBeforeEnteringAuthPage(currentPathName + currentQueryParams)
        window.location.href = e.currentTarget.href
    }

    const _handleOnUserClick = () => { history.push('/profile') }

    const _onHamburgerClick = () => { openModalBlogMenu() }

    return (
        <div className={cx('MainHeader')}>
            <div className={cx('contents')}>
                {deviceType === 'MOBILE' 
                ? 
                <div className={cx('shortMenu-container')}>
                    <div onClick={_onHamburgerClick} className={cx('menuImg-container')}><img src={hamburgerImgSrc}/></div>
                </div>                
                :
                <div className={cx('longMenu-container')}>
                    <nav>
                        <Link to="/">{deviceType === "PC" 
                            ? <div className={cx('logo')}><img src={logoImgSrc}/><span>BPEAK BLOG</span></div>
                            : 'BP'}
                        </Link>
                        <NavLink to="/AboutMe">ABOUT ME</NavLink>
                        <NavLink to="/posts" activeClassName={cx('active')}>POSTS</NavLink>
                        <NavLink to="/visitors" activeClassName={cx('active')}>VISITORS</NavLink>
                        {userState.isAdmin && <NavLink to="/admin" activeClassName={cx('active')}>ADMIN</NavLink>}                
                    </nav>
                </div>}
                {userState.isLoggedIn 
                ?
                <div className={cx('user-container')}>
                    <div onClick={_handleOnUserClick} className={cx('ProfileImg-container')}><ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/></div>
                    <span onClick={_handleOnUserClick} className={cx('nick')}>{userState.nick}</span>
                </div>
                :
                <div className={cx('auth-container')}>
                    {deviceType === 'PC' 
                    ? 
                    <Fragment>
                        {/* <a onClick={_onSocialLoginClick} className={cx('social')} href="/api/auth/social/kakao"><img src={kakaoImgSrc}/></a>
                        <a onClick={_onSocialLoginClick} className={cx('social')} href="/api/auth/social/naver"><img src={naverImgSrc}/></a> */}
                        <Link className={cx('local')} to="/join">Join</Link> 
                        <Link className={cx('local')} to="/login">Login</Link>
                    </Fragment>
                    :
                    <Link className={cx('local')} to="/login">Login</Link>
                    }
                </div>}
            </div>      
        </div>
    )
}

export default MainHeader