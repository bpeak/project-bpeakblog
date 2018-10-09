import * as actionTypes from './actionTypes'

const defaultState = {
    items : undefined,
    lastUpdatedDate : undefined
}

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.VISITORCARDS_RECEIVED){
        return ({
            ...state,
            items : action.visitorCards,
            lastUpdatedDate : '미규현'
        })
    } else if (action.type === actionTypes.NEW_VISITORCARD_RECEIVED){
        return ({
            ...state,
            items : [action.visitorCard, ...state.items]
        })
    } else {
        return state
    }
}

export default reducer