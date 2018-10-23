import * as actionTypes from './actionTypes'

const defaultState = {
    isLoggedIn : false,
    token : undefined,
    isAdmin : false,
    unique_id : undefined,
    nick : undefined,
    profileImgSrc : undefined
}

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.LOGIN_SUCCESS){
        return ({
            ...state,
            isLoggedIn : true,
            token : action.token,
            isAdmin : action.isAdmin,
            unique_id : action.unique_id,
            nick : action.nick,
            profileImgSrc : action.profileImgSrc
        })
    } else if(action.type === actionTypes.LOGOUT_SUCCESS){
        return defaultState
    } else if(action.type === actionTypes.USER_PROFILE_IMG_CHANGED){
        return ({
            ...state,
            profileImgSrc : action.profileImgSrc
        })
    } else if(action.type === actionTypes.USER_PROFILE_DETAILS_CHANGED){
        return ({
            ...state,
            nick : action.nick,
        })
    } else {
        return state
    }
}

export default reducer