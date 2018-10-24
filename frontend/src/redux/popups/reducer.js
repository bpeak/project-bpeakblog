import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const defaultState = []

const reducer = handleActions({
    [actionTypes.OPEN_POPUP] : (state, action) => {
        return [
            ...state,
            {
                unique_id : action.payload.unique_id,
                popupType : action.payload.popupType,
                icon : action.payload.icon,
                title : action.payload.title,
                description : action.payload.description,
            }
        ]
    },
    [actionTypes.CLOSE_POPUP] : (state, action) => {
        const prevPopups = state
        const nextPopups = prevPopups.filter(popup => {
            return ( action.payload.unique_id !== popup.unique_id )
        })
        return nextPopups
    }
}, defaultState)

// const reducer = (state = defaultState, action) => {
//     if(action.type === actionTypes.OPEN_POPUP){
//         return [
//             ...state,
//             {
//                 popupType : action.popupType,
//                 unique_id : action.unique_id,
//                 icon : action.icon,
//                 title : action.title,
//                 description : action.description,
//                 imgName : action.imgName
//             }
//         ]
//     } else if (action.type === actionTypes.CLOSE_POPUP){
//         const nextState = state.filter(popup => {
//             return ( action.unique_id !== popup.unique_id )
//         })
//         return nextState
//     } else {
//         return state
//     }
// }

export default reducer