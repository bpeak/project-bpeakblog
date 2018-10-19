import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const postsReceived = createAction(actionTypes.POSTS_RECEIVED) // posts, comments, replies, date

export const postCommentAdded = createAction(actionTypes.POST_COMMENT_ADDED) // comment

export const postCommentReplyAdded = createAction(actionTypes.POST_COMMENT_REPLY_ADDED) // reply

// export const postCommentReplyAdded = createAction(actionTypes.POST_COMMENT_REPLY_ADDED) // reply