import React, { Component, Fragment } from 'react'
//modules
import history from '~modules/history'
//styles
import classNames from 'classnames/bind'
import styles from './PreSocialLoginPage.scss'
const cx = classNames.bind(styles)
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'

class PreSocialLoginPage extends Component {
    constructor(){
        super()
        this.state = {
            preUser : undefined,
            remainingTime : {
                m : 3,
                s : 0
            }
        }
    }

    _setPreUser = (preUser) => { this.setState(() => ({ preUser }))}
    _setPreUserNick = (nick) => { this.setState((state) => ({
        preUser : {
            ...state.preUser,
            nick
        }
    }))}

    _setMinute = (m) => {
        this.setState((state) => ({
            remainingTime : {
                ...state.remainingTime,
                m
            }
        }))
    }

    _setSecond = (s) => {
        this.setState((state) => ({
            remainingTime : {
                ...state.remainingTime,
                s
            }
        }))
    }

    _getFrontTimeSecond = (s) => {
        const sLetter = String(s)
        if(sLetter.length === 1){
            return 0
        } else {
            return sLetter[0]
        }
    }

    _getEndTimeSecond = (s) => {
        const sLetter = String(s)
        if(sLetter.length === 1){
            return sLetter
        } else {
            return sLetter[1]
        }
    }

    _getNextRemainingTime = (remainingTime) => {
        const prevS = remainingTime.s
        let nextS = prevS
        const prevM = remainingTime.m
        let nextM = prevM
        if(remainingTime.s !== 0){
            nextS = prevS - 1
        } else {
            nextM = prevM - 1
            nextS = 59
        }
        const nextRemainingTime = {
            m : nextM,
            s : nextS
        }
        return nextRemainingTime
    }

    _handleOnNickChange = (e) => {
        const nick = e.currentTarget.value
        this._setPreUserNick(nick)
        this.props.validateNick(nick)
    }

    _handleOnBtnSubmitClick = (e) => {
        e.preventDefault()
        this.props.socialJoin()
    }

    async componentDidMount(){
        try{
            const response = await this.props.getPreUser()
            if(!response) { return }
            const { preUser } = response
            if(!preUser){
                this.props.openPreUserErrorPopup()
                const { storeState } = this.props
                return console.log('여기서 리다이렉트 시켜야되는데 로컬스토리지에 urlHistory 도 저장해야겟네이거 아니면 없잔아')
            }

            console.log(preUser, '프리유저')

            if(preUser.isMember) {
                console.log('바로로그인 밖으로 리다이렉트')
            } else {
                this._setPreUser(preUser)
                this.props.validateNick(preUser.nick)
            }

            setInterval(() => {
                const prevRemainingTime = this.state.remainingTime
                const nextPreminingTime = this._getNextRemainingTime(prevRemainingTime)
                this._setMinute(nextPreminingTime.m)
                this._setSecond(nextPreminingTime.s)
            }, 1000)
        }
        catch(err){
            console.log(err)
        }
    }

    render() {

        const { 
            _handleOnNickChange,
            _handleOnBtnSubmitClick,
            _getFrontTimeSecond, 
            _getEndTimeSecond
        } = this
        const { preUser, remainingTime } = this.state
        const { nickState } = this.props

        return (
            <MainTemplate>
                <div className={cx('PreSocialLoginPage')}>
                    {!preUser ? <div className={cx('spinner-container')}><LargeSpinner/></div> 
                    :<Fragment>
                    <h1>Welcome!</h1>
                    <div className={cx('ProfileImg-container')}>
                        <ProfileImg isMember={true} imgSrc={preUser.profileImgSrc}/>
                    </div>
                    <span className={cx('nick')}>{preUser.nick}</span>
                    <form className={cx('form')}>
                        <div className={cx('bundle')}>
                            <input defaultValue={preUser.nick} onChange={_handleOnNickChange} required/>
                            <label htmlFor="nick">Nick</label>
                            <div className={cx(
                                'icon-container', 
                                { active :  ( nickState.isTouched && !nickState.isFetcing )}
                                )}>
                                <i className={cx((nickState.isValidated ? 'check' : 'x'), (nickState.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        {nickState.isTouched && nickState.errMsg && !nickState.isFetching && <div className={cx('errMsg')}>{nickState.errMsg}</div>}
                        <div className={cx('remainingTime')}>
                            <div className={cx('time')}>
                                <div>
                                    <span>{remainingTime.m}</span>
                                </div>
                                <div>
                                    <span>:</span>
                                </div>
                                <div>
                                    <span>{_getFrontTimeSecond(remainingTime.s)}</span>
                                    <span>{_getEndTimeSecond(remainingTime.s)}</span>
                                </div>
                            </div>
                            <div className={cx('msg')}>제한시간이 경과되면 BpeakBlog가 가지고있는 당신의 소셜정보를 파기합니다.</div>
                        </div>                                               
                        <button onClick={_handleOnBtnSubmitClick} disabled={!nickState.isValidated} className={cx('submit')}>SUBMIT</button>
                    </form>                             
                    </Fragment>}               
                </div>
            </MainTemplate>
        )
    }
}

export default PreSocialLoginPage