import React from 'react'
import { Route, NavLink } from 'react-router-dom'
//modules
import textValidator from '~modules/textValidator'
//configs
import * as userConfig from '~configs/user.config.json'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './ProfilePage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

const ProfilePage = ({
    userState,
    profileImgStatus,
    handleOnInputProfileImgChange,
    getMyProfile,
    updatePassword,
    updateDetails,
    handleOnLogoutClick,
    userProfileDetailsChanged,
}) => {
    
    return (
        <MainTemplate title="Profile">
            <div className={cx('ProfilePage')}>
                <main>
                    <nav>
                        <NavLink to="/profile">내정보</NavLink>
                        <NavLink to="/profile/edit">프로필 편집</NavLink>
                        <NavLink to="/profile/changePassword">비밀번호 변경</NavLink>
                        <a onClick={handleOnLogoutClick}>로그아웃</a>
                    </nav>
                    <div className={cx('contents')}>
                        <Route exact path="/profile" render={() => (
                            <div className={cx('profile')}>
                                <div className={cx('ProfileImg-container')}>
                                    <ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/>
                                </div>
                                <span className={cx('nick')}>{userState.nick}</span>
                            </div>
                        )}/>
                        <Route exact path="/profile/edit" render={() => (
                            <ProfileEdit
                            userState={userState}
                            profileImgStatus={profileImgStatus}
                            handleOnInputProfileImgChange={handleOnInputProfileImgChange}
                            getMyProfile={getMyProfile}
                            updateDetails={updateDetails}
                            userProfileDetailsChanged={userProfileDetailsChanged}
                            />
                        )}/>
                        <Route exact path="/profile/changePassword" render={() => (
                            <ChangePassword
                            updatePassword={updatePassword}
                            />
                        )}/>
                    </div>
                </main>
            </div>
        </MainTemplate>
    )
}

const MyInfo = () => {

}

class ProfileEdit extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            nick : props.userState.nick,
            sex : undefined,
            errMsg : null,
        }
    }

    _setSex = (sex) => { this.setState(() => ({ sex })) }

    _handleOnChangeProfileImgClick = (e) => {
        e.preventDefault()
        this.refs.profileImg.click()
    }

    _handleOnNickChange = (e) => {
        const nick = e.currentTarget.value
        this.setState(() => ({ errMsg : null }))
        this.setState(() => ({ nick }))
    }

    _handleOnSexClick = (e) => {
        const sex = e.currentTarget.id
        this._setSex(sex)
    }

    _handleOnSubmitClick = async (e) => {
        e.preventDefault()
        const { nick, sex } = this.state
        const response = await this.props.updateDetails({
            nick,
            sex
        })
        if(!response){ return }
        if(!response.isSuccess){ return this.setState(() => ({ errMsg : response.errMsg })) } 
        this.props.userProfileDetailsChanged({
            nick : response.user.nick
        })
        alert('프로필이 저장되었습니다.')
    }

    async componentDidMount(){
        const response = await this.props.getMyProfile()
        if(!response){ return }
        const sex = response.user.sex
        if(!sex){ return }
        this._setSex(sex)
        this.refs[sex].checked = true
    }

    render(){

        const { 
            _handleOnNickChange,
            _handleOnChangeProfileImgClick,
            _handleOnSexClick,
            _handleOnSubmitClick,
        } = this
        const { 
            nick, 
            profileImgSrc,
            errMsg,
        } = this.state
        const { 
            handleOnInputProfileImgChange,
            userState,
            profileImgStatus,
        } = this.props

        return (
            <form className={cx('ProfileEdit')}>
                <div 
                onClick={_handleOnChangeProfileImgClick}
                className={cx('ProfileImg-container')}>
                    <ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/>
                </div>
                {profileImgStatus.isFetching && <div className={cx('spinner-container')}><SmallSpinner/></div>}
                <input 
                    onChange={handleOnInputProfileImgChange}
                    className={cx('profileImg')} 
                    ref="profileImg" 
                    type="file" 
                    accept="image/*" 
                />
                <button
                    className={cx('profileImg')} 
                    onClick={_handleOnChangeProfileImgClick}>
                    프로필 사진 변경
                </button>
                <div className={cx('nick')}>
                    <label>닉네임</label>
                    <input 
                    onChange={_handleOnNickChange}
                    type="text" 
                    value={nick}/>                    
                </div> 
                <div className={cx('sex')}>
                    <label htmlFor="M">Man</label>
                    <input onClick={_handleOnSexClick} ref="M" id="M" type="radio" name="sex"/>
                    <label htmlFor="W">Woman</label>
                    <input onClick={_handleOnSexClick} ref="W" id="W" type="radio" name="sex"/>
                </div>
                {errMsg && <div className={cx('errMsg')}>{errMsg}</div>}
                <button className={cx('submit')} onClick={_handleOnSubmitClick}>제출</button>
            </form>        
        )        
    }
}

class ChangePassword extends React.PureComponent{
    state = {
        prevPassword : '',
        newPassword : '',
        checkNewPassword : '',
        errMsg : null,
    }

    _setErrMsg = (errMsg) => { this.setState(() => ({ errMsg }))}

    _handleOnInputPrevPasswordChange = (e) => {
        const prevPassword = e.currentTarget.value
        this.setState(() => ({ prevPassword }))
    }

    _handleOnInputNewPasswordChange = (e) => {
        const newPassword = e.currentTarget.value
        this.setState(() => ({ newPassword }))
    }

    _handleOnInputCheckNewPasswordChange = (e) => {
        const checkNewPassword = e.currentTarget.value
        this.setState(() => ({ checkNewPassword }))
    }

    _handleOnSubmitClick = async (e) => {
        e.preventDefault()
        const newPassword = this.state.newPassword
        const checkNewPassword = this.state.checkNewPassword
        if(newPassword !== checkNewPassword){
            return alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.')
        }
        if(!textValidator.validateBlank(newPassword)){
            return alert('비밀번호에 공백을 포함할수 없습니다.')
        }
        if(!textValidator.validateMinLength(newPassword, userConfig.PASSWORD_CHAR_MIN)){
            return alert(`비밀번호는 최소 ${userConfig.PASSWORD_CHAR_MIN}자 부터 가능합니다`)
        }
        if(!textValidator.validateMaxLength(newPassword, userConfig.PASSWORD_CHAR_MAX)){
            return alert(`비밀번호는 최대 ${userConfig.PASSWORD_CHAR_MAX}자 까지 가능합니다.`)
        }
        const prevPassword = this.state.prevPassword
        const response = await this.props.updatePassword(prevPassword, newPassword)
        if(!response) { return }
        if(response.isSuccess){
            alert('비빌번호가 변경되었습니다.')
        } else {
            alert('이전 비밀번호가 일치하지 않습니다.')
        }
    }

    render(){        

        const { 
            _handleOnInputPrevPasswordChange,
            _handleOnInputNewPasswordChange,
            _handleOnInputCheckNewPasswordChange,
            _handleOnSubmitClick,
        } = this

        const {
            prevPassword,
            newPassword,
            checkNewPassword,
        } = this.state

        return (
            <div className={cx('ChangePassword')}>
                <div className={cx('input-container')}>
                    <input onChange={_handleOnInputPrevPasswordChange} required id="prevPassword" type="password"/>
                    <label htmlFor="prevPassword">현재 비밀번호</label>
                </div>
                <div className={cx('input-container')}>
                    <input onChange={_handleOnInputNewPasswordChange} required id="newPassword" type="password"/>
                    <label htmlFor="newPassword">새 비밀번호</label>
                </div>
                <div className={cx('input-container')}>
                    <input onChange={_handleOnInputCheckNewPasswordChange} required id="checkNewPassword" type="password"/>
                    <label htmlFor="checkNewPassword">새 비밀번호 확인</label>
                </div>
                <button disabled={!prevPassword || !newPassword || !checkNewPassword} onClick={_handleOnSubmitClick}>비밀번호 변경</button>
            </div>        
        )        
    }
}

export default ProfilePage