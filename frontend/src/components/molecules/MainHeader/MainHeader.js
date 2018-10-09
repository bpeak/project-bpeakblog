import React from 'react'
import classNames from 'classnames/bind'
import { Link, NavLink } from 'react-router-dom'
//modules
import history from '~modules/history'
//imgs
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
        storeState,
        urlHistoryActions
    } = props

    const _handleOnSocialLoginClick = (e) => {
        e.preventDefault()
        const pathName = window.location.pathname
        const params = window.location.search
        urlHistoryActions.enterToAuthPage({ from : pathName + params })
        window.location.href = e.currentTarget.href
    }

    return (
        <div className={cx('MainHeader')}>
            <div className={cx('contents')}>
            <div className={cx('shortMenu-container')}>
                <div className={cx('menuImg-container')}><img src={hamburgerImgSrc}/></div>
                {/* <nav>여기에 네비게이션</nav> */}
            </div>
            <div className={cx('longMenu-container')}>
                <nav>
                    <Link to="/">BPEAK BLOG</Link>
                    <NavLink to="/AboutMe">ABOUT ME</NavLink>
                    <NavLink to="/posts" activeClassName={cx('active')}>POSTS</NavLink>
                    <NavLink to="/visitors" activeClassName={cx('active')}>VISITORS</NavLink>
                    <NavLink to="/admin" activeClassName={cx('active')}>ADMIN</NavLink>                    
                </nav>
            </div>
                {storeState.user.isLoggedIn ?
                <div className={cx('user-container')}>
                    <div className={cx('ProfileImg-container')}><ProfileImg isMember={true} imgSrc={storeState.user.profileImgSrc}/></div>
                    <span className={cx('nick')}>{storeState.user.nick}</span>
                </div>
                :<div className={cx('auth-container')}>
                    <a onClick={_handleOnSocialLoginClick} className={cx('social')} href="/api/auth/social/kakao"><img src={kakaoImgSrc}/></a>
                    <a onClick={_handleOnSocialLoginClick} className={cx('social')} href="/api/auth/social/naver"><img src={naverImgSrc}/></a>
                    <Link className={cx('local')} to="/join">Join</Link> 
                    <Link className={cx('local')} to="/login">Login</Link>
                </div>}
            </div>      
            
        </div>
    )
}

export default MainHeader


{/* <Link to="/login">로그인</Link>
<a href="https://accounts.google.com/o/oauth2/auth?client_id=190024014970-5mlu7emmiboq7kcqoj0cdmtuqhh6ombg.apps.googleusercontent.com&redirect_uri=http://localhost/api/auth/social/google&scope=https://www.googleapis.com/auth/plus.login&response_type=code"><i className="fab fa-google"></i></a>
<a href="#"><i className="fab fa-facebook"></i></a>
<a href="/api/auth/social/kakao"><img src={kakaoImgSrc}/></a>
<a href="/api/auth/social/naver"><img src={naverImgSrc}/></a>
<Link to="/join">회원가입</Link>  */}