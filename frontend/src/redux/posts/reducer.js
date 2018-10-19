import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const defaultState = {
    items : undefined,
    comments : undefined,
    replies : undefined,
    lastUpdatedDate : false,
    isLoaded : false
}

const reducer = handleActions({
    [actionTypes.POSTS_RECEIVED] : (state, action) => {
        return ({
            ...state,
            items : [...action.payload.posts],
            comments : [...action.payload.comments],
            replies : [...action.payload.replies],
            lastUpdatedDate : action.payload.date,
            isLoaded : true
        })
    },
    [actionTypes.POST_RECEIVED] : (state, action) => {
        return ({
            ...state,
            items : [action.payload.post, ...state.items]
        })
    },
    [actionTypes.POST_COMMENT_ADDED] : (state, action) => {
        const newComment = Object.assign({}, action.payload.comment)
        const nextComments = [newComment, ...state.comments]
        const nextPosts = state.items.map((post) => {
            if(post._id !== newComment.post_id) { return post } 
            const nextPostComments = [newComment._id, ...post.comments]
            return ({
                ...post,
                comments : nextPostComments
            })
        })
        return ({
            ...state,
            items : nextPosts,
            comments : nextComments,
        })
    },
    [actionTypes.POST_COMMENT_REPLY_ADDED] : (state, action) => {
        const newReply = Object.assign({}, action.payload.reply)
        const nextReplies = [newReply, ...state.replies]
        const nextComments = state.comments.map((comment) => {
            if(comment._id !== newReply.comment_id){ return comment }
            const nextCommentReplies = [newReply._id, ...comment.replies]
            return ({
                ...comment,
                replies : nextCommentReplies
            })
        })
        return ({
            ...state,
            comments : nextComments,
            replies : nextReplies
        })
    }
}, defaultState)

export default reducer