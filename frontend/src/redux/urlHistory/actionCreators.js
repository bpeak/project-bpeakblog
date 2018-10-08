import * as actionTypes from './actionTypes'

export const enterToAuthPage = (payload) => {
    return { 
        type : actionTypes.ENTER_TO_AUTH_PAGE,
        from : payload.from
    }
}