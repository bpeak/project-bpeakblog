import * as actionTypes from './actionTypes'

const defaultState = {
    toAuthPageFrom : undefined
}

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.ENTER_TO_AUTH_PAGE){
        return ({
            ...state,
            toAuthPageFrom : action.from
        })
    } else {
        return state
    }
}

export default reducer