import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
//actions
import * as userActionCreatros from '~redux/user/actionCreators'
//components
import ProfilePage from '~components/pages/ProfilePage/ProfilePage'
//modules
import fetchCreator from '~modules/fetchCreator'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = (dispatch) => ({
    userActions : {
        userProfileImgChanged : (payload) => { dispatch(userActionCreatros.userProfileImgChanged(payload)) }
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
    
    handleOnInputProfileImgChange = async (e) => {
        try{
            const file = e.currentTarget.files[0]
            if(!file){ return }

            this._setInputIsFetching('profileImg', true)

            const response = await this._updateProfileImg(file)
            if(!response){ return }
            const { profileImgSrc } = response
            
            setTimeout(() => {
                this.props.userActions.userProfileImgChanged({ profileImgSrc })
                this._setInputIsFetching('profileImg', false)
            }, 2000)
            
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
            handleOnInputProfileImgChange={this.handleOnInputProfileImgChange}
            profileImgStatus={this.state.profileImg}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer)