import React, { Component, Fragment } from 'react'
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
            remainingTime : {
                m : 3,
                s : 0
            }
        }
    }

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

    _onInputNickChange = (e) => {
        const nick = e.currentTarget.value
        this.props.handleOnNickChange(nick)
    }

    _onBtnSubmitClick = (e) => {
        e.preventDefault()
        console.log('전송한덴다')
    }

    _onInputSexClick = (e) => {
        const sex = e.currentTarget.value
        this.props.handleOnSexChange(sex)
    }

    componentDidMount(){
        setInterval(() => {
            const prevRemainingTime = this.state.remainingTime
            const nextPreminingTime = this._getNextRemainingTime(prevRemainingTime)
            this._setMinute(nextPreminingTime.m)
            this._setSecond(nextPreminingTime.s)
        }, 1000)
    }

    render() {

        const { 
            _getFrontTimeSecond, 
            _getEndTimeSecond,

            _onInputNickChange,
            _onInputSexClick,
            _onBtnSubmitClick
        } = this

        const {
            remainingTime
        } = this.state

        const {
            isLoadedPreUser,
            profileImgSrc,
            nickState,
            sexState
        } = this.props

        return (
            <MainTemplate>
                <div className={cx('PreSocialLoginPage')}>
                    {!isLoadedPreUser ? <div className={cx('spinner-container')}><LargeSpinner/></div> 
                    :<Fragment>
                    <h1>Welcome!</h1>
                    <div className={cx('ProfileImg-container')}>
                        <ProfileImg isMember={true} imgSrc={profileImgSrc}/>
                    </div>
                    <span className={cx('nick')}>{nickState.val}</span>
                    <form className={cx('form')}>
                        <div className={cx('bundle')}>
                            <input defaultValue={nickState.val} onChange={_onInputNickChange} required/>
                            <label htmlFor="nick">Nick</label>
                            <div className={cx(
                                'icon-container', 
                                { active :  ( nickState.isTouched && !nickState.isFetcing )}
                                )}>
                                <i className={cx((nickState.isValidated ? 'check' : 'x'), (nickState.isValidated ? "fas fa-check-circle" : "fas fa-times-circle"))}></i>
                            </div>
                        </div>
                        {nickState.isTouched && nickState.errMsg && !nickState.isFetching && <div className={cx('errMsg')}>{nickState.errMsg}</div>}
                        <div className={cx('bundle-sex')}>
                            <div className={cx('checkbox-container')}>
                                <label htmlFor="M">Man</label><input onClick={_onInputSexClick} id="M" type="radio" name="sex" value="M"/>
                                <label htmlFor="W">Woman</label><input onClick={_onInputSexClick} id="W" type="radio" name="sex" value="W"/>
                            </div>
                            <div className={cx('icon-container', { active : sexState.val !== '' })}><i className="fas fa-check-circle"></i></div>
                        </div>                        
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
                        <button onClick={_onBtnSubmitClick} disabled={!nickState.isValidated} className={cx('submit')}>SUBMIT</button>
                    </form>                             
                    </Fragment>}               
                </div>
            </MainTemplate>
        )
    }
}

export default PreSocialLoginPage