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
    handleOnInputProfileImgChange
}) => {

    console.log(profileImgStatus)

    const _handleOnProfileImgChange = (e) => {
        const file = e.currentTarget.files[0]
        const formData = new FormData()
        formData.append('profileImgFile', file)
        fetch('/api/users/me/profileImgSrc', {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${userState.token}`
            },
            body : formData
        })
        .then(data => data.json())
        .then(json => console.log(json))
    }

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
                                <input
                                    onChange={handleOnInputProfileImgChange}
                                    type="file"
                                    accept="image/*"/>
                                <div className={cx('ProfileImg-container')}>
                                    <ProfileImg isMember={true} imgSrc={userState.profileImgSrc}/>
                                </div>
                                <div className={cx('info')}>
                                    <span>{userState.nick}</span>
                                </div>
                            </div>
                        )}/>
                        <Route exact path="/profile/edit" render={() => {
                            return (
                                <div>편집</div>
                            )
                        }}/>
                        <Route exact path="/profile/changePassword" render={() => {
                            return (
                                <div>비밀번호 변경</div>
                            )
                        }}/>
                    </div>
                </main>
            </div>
        </MainTemplate>
    )
}

export default ProfilePage