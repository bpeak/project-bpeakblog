import * as actionTypes from './actionTypes'

export const postReceived = (payload) => {
    return ({
        type : actionTypes.POST_RECEIVED,
        posts : payload.posts,
        date : new Date().toISOString()
    })
}