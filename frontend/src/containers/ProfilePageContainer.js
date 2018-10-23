import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
//actions
import * as userActionCreatros from '~redux/user/actionCreators'
import * as popupsActionCreators from '~redux/popups/actionCreators'
//components
import ProfilePage from '~components/pages/ProfilePage/ProfilePage'
//modules
import fetchCreator from '~modules/fetchCreator'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = (dispatch) => ({
    userActions : {
        userProfileImgChanged : (payload) => { dispatch(userActionCreatros.userProfileImgChanged(payload)) },
        userProfileDetailsChanged : (payload) => { dispatch(userActionCreatros.userProfileDetailsChanged(payload)) },
        logoutSuccess : () => { dispatch(userActionCreatros.logoutSuccess()) },
    },
    popupsActions : {
        openPopup : (payload) => { dispatch(popupsActionCreators.openPopup(payload)) }
    }
})

class ProfilePageContainer extends React.PureComponent {
    state = {
        profileImg : {
            isFetching : false
        }
    }
    
    _setInputIsFetching = (inputName, isFetching) => { 
        this.setState((state) => ({
            [inputName] : {
                ...state.profileImg,
                isFetching : isFetching
            }
        }))
    }

    _updateProfileImg = (profileImgFile) => {
        const { userState } = this.props
        const formData = new FormData()
        formData.append('profileImgFile', profileImgFile)
        return fetchCreator('/api/users/me/profileImgSrc', {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${userState.token}`
            },
            body : formData
        })
    }

    updateDetails = async (user) => {
        const { userState } = this.props
        return fetchCreator('/api/users/me/details', {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${userState.token}`,
                'content-type' : 'application/json',
            },
            body : JSON.stringify({
                nick : user.nick,
                sex : user.sex
            })
        })
    }

    getMyProfile = () => {
        const { userState } = this.props
        return fetchCreator('/api/users/me', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`
            }
        })       
    }

    updatePassword = (prevPassword, newPassword) => {
        const { userState } = this.props
        return fetchCreator('/api/users/me/password', {
            method : 'PATCH',
            headers : {
                Authorization : `Bearer ${userState.token}`,
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                prevPassword,
                newPassword
            })
        })
    }
    
    handleOnLogoutClick = () => {
        const confirmed = confirm('로그아웃 하시겠습니까?')
        if(!confirmed){ return }
        const { 
            userState,
            userActions,
            popupsActions,
        } = this.props

        const nick = userState.nick

        userActions.logoutSuccess()
        popupsActions.openPopup({
            popupType : "AUTO",
            icon : '블라',
            title : 'LOGOUT SUCCESS',
            description : `${nick}님 안녕히가세요.`,
            imgName : 'clap'
        })      
    }

    handleOnInputProfileImgChange = async (e) => {
        try{
            const file = e.currentTarget.files[0]
            if(!file){ return }

            this._setInputIsFetching('profileImg', true)

            const response = await this._updateProfileImg(file)
            if(!response){ return }
            const { profileImgSrc } = response
            
            this.props.userActions.userProfileImgChanged({ profileImgSrc })
            this._setInputIsFetching('profileImg', false)
        }
        catch(err){
            console.log(err)
        }
    }

    render() {
        const { userState } = this.props

        if(!userState.isLoggedIn) { return <Redirect to="/login"/>}

        return (
            <ProfilePage
            userState={userState}
            getMyProfile={this.getMyProfile}
            handleOnInputProfileImgChange={this.handleOnInputProfileImgChange}
            profileImgStatus={this.state.profileImg}
            updatePassword={this.updatePassword}
            updateDetails={this.updateDetails}
            userProfileDetailsChanged={this.props.userActions.userProfileDetailsChanged}
            handleOnLogoutClick={this.handleOnLogoutClick}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer)