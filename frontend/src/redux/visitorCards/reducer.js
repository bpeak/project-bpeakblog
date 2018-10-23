import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const defaultState = {
    items : undefined,
    lastUpdatedDate : undefined
}

const reducer = handleActions({
    [actionTypes.VISITORCARDS_RECEIVED] : (state, action) => ({
        ...state,
        items : action.payload.visitorCards,
        lastUpdatedDate : '미구현'
    }),
    [actionTypes.NEW_VISITORCARD_RECEIVED] : (state, action) => ({
        ...state,
        items : [action.payload.visitorCard, ...state.items]
    })
}, defaultState)

export default reducer