import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const postReceived = createAction(actionTypes.POST_RECEIVED) // posts, date
export const postCommentAdded = createAction(actionTypes.POST_COMMENT_ADDED) // comment