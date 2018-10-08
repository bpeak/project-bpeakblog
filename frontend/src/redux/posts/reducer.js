import * as actionTypes from './actionTypes'

const defaultState = {
    items : undefined,
    lastUpdatedDate : false
}

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.POST_RECEIVED){
        return ({
            items : action.posts,
            lastUpdatedDate : action.date
        })
    } else {
        return state
    }
}

export default reducer