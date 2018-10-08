import * as actionTypes from './actionTypes'

export const loginSuccess = (payload) => {
    return ({
        type : actionTypes.LOGIN_SUCCESS,
        unique_id : payload.unique_id,
        nick : payload.nick,
        profileImgSrc : payload.profileImgSrc
    })
}

export const logoutSuccess = () => {
    return ({
        type : actionTypes.LOGOUT_SUCCESS
    })
}

