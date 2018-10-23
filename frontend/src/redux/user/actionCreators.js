import * as actionTypes from './actionTypes'

export const loginSuccess = (payload) => {
    return ({
        type : actionTypes.LOGIN_SUCCESS,
        token : payload.token,
        isAdmin : payload.isAdmin,
        unique_id : payload.unique_id,
        nick : payload.nick,
        profileImgSrc : payload.profileImgSrc,
    })
}

export const logoutSuccess = () => {
    return ({
        type : actionTypes.LOGOUT_SUCCESS
    })
}

export const userProfileImgChanged = (payload) => {
    return ({
        type :actionTypes.USER_PROFILE_IMG_CHANGED,
        profileImgSrc : payload.profileImgSrc
    })
}

export const userProfileDetailsChanged = (payload) => {
    return ({
        type : actionTypes.USER_PROFILE_DETAILS_CHANGED,
        nick : payload.nick,
    })
}

