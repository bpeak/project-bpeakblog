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
        // console.log('추가될 리플라이')
        console.log('new R!!! :', newReply)
        const nextReplies = [newReply, ...state.replies]
        // console.log('prevPreplies : ', state.replies)
        // console.log('nextReplies : ', nextReplies)
        const nextComments = state.comments.map((comment) => {
            // console.log('new R!!! :', newReply)
            // console.log(comment._id, newReply.comment_id, newReply, '머야이거')
            if(comment._id !== newReply.comment_id){ return comment }
            const nextCommentReplies = [newReply._id, ...comment.replies]
            // console.log(nextCommentReplies, '이게추가된건데리플리즈?')
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