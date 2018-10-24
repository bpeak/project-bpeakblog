import React  from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//imgs
import naverImgSrc from '~assets/naver.png'
import kakaoImgSrc from '~assets/kakao.png'
//styles
import styles from './LoginPage.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

const LoginPage = (props) => {

    const { 
        inputVal,
        errMsg,
        handleOnEmailChange, handleOnPasswordChange,
        sendLoginForm
    } = props

    return (
        <MainTemplate title="Login">
            <div className={cx('LoginPage')}>
                <h1>Sign in</h1>
                <form className={cx('LoginForm')}>
                    <div className={cx('bundle')}>
                        <input 
                        onChange={(e) => handleOnEmailChange(e.currentTarget.value)} 
                        required
                        />
                        <label>Email</label>
                    </div>
                    <div className={cx('bundle')}>
                        <input 
                        onChange={(e) => handleOnPasswordChange(e.currentTarget.value)} 
                        type="password" 
                        required
                        />
                        <label>Password</label>
                    </div>
                    <button 
                    className={cx('btnSubmit')}
                    onClick={(e) => { e.preventDefault(); sendLoginForm() }}
                    disabled={inputVal.email === '' || inputVal.password === ''} >
                    Submit
                    </button>
                </form>
                {errMsg && <div className={cx('errMsg')}>{errMsg}</div>}
                <div className={cx('toJoin-container')}>아직 아이디가 없으신가요? <Link to="/join">회원가입</Link></div>
                {/* <div className={cx('social')}>
                    <span>소셜로그인으로 이용하기</span>
                    <img src={kakaoImgSrc}/>
                    <img src={naverImgSrc}/>
                </div> */}
            </div>
        </MainTemplate>
    )
}

LoginPage.propTypes = {
    inputVal : PropTypes.object.isRequired,
    handleOnEmailChange : PropTypes.func.isRequired,
    handleOnPasswordChange : PropTypes.func.isRequired,
    errMsg : PropTypes.string
}

export default LoginPage