import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const defaultState = {
    items : undefined,
    lastUpdatedDate : false
}

const reducer = handleActions({
    [actionTypes.POST_RECEIVED] : (state, action) => {
        return ({
            ...state,
            items : action.payload.posts,
            lastUpdatedDate : action.payload.date
        })
    },
    [actionTypes.POST_COMMENT_ADDED] : (state, action) => {
        const comment = action.payload.comment
        const post_id = comment.post_id
        const currentPosts = state.items
        const nextPosts = currentPosts.map((post) => {
            if(post._id === post_id){
                const nextComments = [...post.comments]
                nextComments.unshift(comment)
                const nextPost = {
                    ...post,
                    comments : nextComments
                }
                console.log(post, '이전포스트')
                console.log(nextPost, '다음포스트')
                return post
            } else {
                return post
            }
        })
        console.log(nextPosts, currentPosts, '넥스프토스트랑 켜렌트')
        return ({
            ...state,
            items : nextPosts
        })
    }
}, defaultState)

export default reducer