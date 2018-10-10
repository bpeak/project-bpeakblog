import React from 'react'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

const ProfilePage = (props) => {
    console.log(props.userState, '유저스테이트')
    return (
        <MainTemplate title="Profile">
            <div>
                프로필
            </div>
        </MainTemplate>
    )
}

export default ProfilePage