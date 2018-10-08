import * as actionTypes from './actionTypes'

const defaultState = {
    isLoggedIn : false,
    unique_id : 111,
    nick : undefined,
    profileImgSrc : undefined
}

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.LOGIN_SUCCESS){
        return ({
            ...state,
            isLoggedIn : true,
            unique_id : action.unique_id,
            nick : action.nick,
            profileImgSrc : action.profileImgSrc
        })
    } else if(action.type === actionTypes.LOGOUT_SUCCESS){
        return defaultState
    } else {
        return state
    }
}

export default reducer