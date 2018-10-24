import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
//imgs
import naverImgSrc from '~assets/naver.png'
import kakaoImgSrc from '~assets/kakao.png'
//styles
import styles from './JoinPage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

class JoinPage extends Component{
    constructor(){
        super()
    }

    _handleOnEmailChange = (e) => {
        const { validateEmail } = this.props
        const email = e.currentTarget.value
        validateEmail(email)
    }

    _handleOnNickChange = (e) => {
        const { validateNick } = this.props
        const nick = e.currentTarget.value
        validateNick(nick)
    }

    _handleOnPassword1Change = (e) => {
        const { changePassword1 } = this.props
        const password1 = e.currentTarget.value
        changePassword1(password1)
    }

    _handleOnPassword2Change = (e) => {
        const { changePassword2 } = this.props
        const password2 = e.currentTarget.value
        changePassword2(password2)
    }

    _handleOnSexClick = (e) => {
        const sex = e.currentTarget.value
        const { clickSex } = this.props
        clickSex(sex)
    }

    _handleOnBtnSubmitClick = (e) => {
        e.preventDefault()
        const { sendJoinForm } = this.props
        sendJoinForm()
    }

    render(){

        const { 
            _handleOnEmailChange, 
            _handleOnNickChange, 
            _handleOnPassword1Change, 
            _handleOnPassword2Change,
            _handleOnSexClick,
            _handleOnBtnSubmitClick
        } = this

        const { status } = this.props

        return (
            <MainTemplate title="Join">
                <div className={cx('JoinPage')}>
                    <h1>Sign up</h1>
                    <form className={cx('JoinForm')}>
                        <div className={cx('bundle')}>
                            <input onChange={_handleOnEmailChange} id="email" required/>
                            <label htmlFor="email">Email</label>
                            <div className={cx(
                                'icon-container', 
                                { active :  ( status.email.isTouched && !status.email.isFetcing )}
                                )}>
                                <i className={cx((status.email.isValidated ? 'check' : 'x'), (status.email.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        {status.email.isTouched && status.email.errMsg && !status.email.isFetching && <div className={cx('errMsg')}>{status.email.errMsg}</div>}
                        <div className={cx('bundle')}>
                            <input onChange={_handleOnNickChange} id="nick" required/>
                            <label htmlFor="nick">Nickname</label>
                            <div className={cx(
                                'icon-container', 
                                { active :  ( status.nick.isTouched && !status.nick.isFetcing )}
                                )}>
                                <i className={cx((status.nick.isValidated ? 'check' : 'x'), (status.nick.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        {status.nick.isTouched && status.nick.errMsg && !status.nick.isFetching && <div className={cx('errMsg')}>{status.nick.errMsg}</div>}
                        <div className={cx('bundle')}>
                            <input type="password" onChange={_handleOnPassword1Change} id="password1" required/>
                            <label htmlFor="password1">Password</label>
                            <div className={cx(
                                'icon-container',
                                { active : ( status.password1.isTouched && status.password2.isTouched )}
                                )}>
                                <i className={cx((status.password1.isValidated ? 'check' : 'x'), (status.password1.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        {status.password1.errMsg && <div className={cx('errMsg')}>{status.password1.errMsg}</div>}
                        <div className={cx('bundle')}>
                            <input type="password" onChange={_handleOnPassword2Change} id="password2" required/>
                            <label htmlFor="password2">Password Check</label>
                            <div className={cx(
                                'icon-container',
                                { active : ( status.password1.isTouched && status.password2.isTouched )}
                                )}>
                                <i className={cx((status.password1.isValidated ? 'check' : 'x'), (status.password1.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        <div className={cx('bundle-sex')}>
                            <div className={cx('checkbox-container')}>
                                <label htmlFor="M">Man</label><input onClick={_handleOnSexClick} id="M" type="radio" name="sex" value="M"/>
                                <label htmlFor="W">Woman</label><input onClick={_handleOnSexClick} id="W" type="radio" name="sex" value="W"/>
                            </div>
                            <div className={cx('icon-container', { active : status.sex.isTouched})}><i className="fas fa-check-circle"></i></div>
                        </div>
                        <button disabled={(
                            !status.email.isValidated ||
                            !status.nick.isValidated ||
                            !status.password1.isValidated ||
                            !status.sex.isTouched 
                        )} onClick={_handleOnBtnSubmitClick} className={cx('btnSubmit')}>Submit</button>
                    </form>
                    <div className={cx('toLogin-container')}>아이디가 있으신가요? <Link to="/login">로그인</Link></div>
                    {/* <div className={cx('social')}>
                        <span>소셜로그인으로 이용하기</span>
                        <img src={kakaoImgSrc}/>
                        <img src={naverImgSrc}/>
                    </div> */}
                </div>
            </MainTemplate>
        )
    }
}

export default JoinPage