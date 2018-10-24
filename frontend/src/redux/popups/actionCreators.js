import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const openPopup = createAction(actionTypes.OPEN_POPUP)
// unique_id
// popupType : "AUTO", "ALERT"
// icon : "waring", "clap", "check"
// title
// description

export const closePopup = createAction(actionTypes.CLOSE_POPUP)
// unique_id