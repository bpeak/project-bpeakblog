import * as actionTypes from './actionTypes'

const defaultState = []

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.OPEN_POPUP){
        return [
            ...state,
            {
                popupType : action.popupType,
                unique_id : action.unique_id,
                icon : action.icon,
                title : action.title,
                description : action.description,
                imgName : action.imgName
            }
        ]
    } else if (action.type === actionTypes.CLOSE_POPUP){
        const nextState = state.filter(popup => {
            return ( action.unique_id !== popup.unique_id )
        })
        return nextState
    } else {
        return state
    }
}

export default reducer