import React from 'react'
import { Route, NavLink } from 'react-router-dom'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
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
    updatePassword
}) => {
    return (
        <MainTemplate title="Profile">
            <div className={cx('ProfilePage')}>
                <main>
                    <nav>
                        <NavLink to="/profile">내정보</NavLink>
                        <NavLink to="/profile/edit">프로필 편집</NavLink>
                        <NavLink to="/profile/changePassword">비밀번호 변경</NavLink>
                    </nav>
                    <div className={cx('contents')}>
                        <Route exact path="/profile" render={() => (
                            <div className={cx('profile')}>
                                {/* <input
                                    onChange={handleOnInputProfileImgChange}
                                    type="file"
                                    accept="image/*"/> */}
                                <div className={cx('ProfileImg-container')}>
                                    <ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/>
                                </div>
                                <span className={cx('nick')}>{userState.nick}</span>
                            </div>
                        )}/>
                        <Route exact path="/profile/edit" render={() => (
                            <ProfileEdit
                            userState={userState}
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

const ProfileEdit = ({
    userState
}) => {
    return (
        <div className={cx('ProfileEdit')}>
            <div className={cx('ProfileImg-container')}>
                <ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/>
            </div>
            <span>{userState.nick}</span>
        </div>        
    )
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