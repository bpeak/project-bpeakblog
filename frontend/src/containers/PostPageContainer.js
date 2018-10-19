import { connect } from 'react-redux'
import fp from 'lodash/fp'
//components
import PostPage from '~components/pages/PostPage/PostPage'

const getPost = (allPosts, post_id) => {
    const postIndex = allPosts.findIndex(post => post._id === post_id)
    const post = postIndex === -1 ? null : allPosts[postIndex]
    return post
}

const getComments = (allComments, comments_ids, allReplies) => {
    const comments = comments_ids.reduce((comments, _id) => {
        const commentIndex = allComments.findIndex((comment) => {
            return _id === comment._id
        })
        if(commentIndex === -1) { return comments }
        const newComments = [allComments[commentIndex], ...comments]
        return newComments
    }, [])

    const commentsWithReplies = comments.map((comment) => {
        const replies_ids = comment.replies
        console.log(replies_ids, '이게  리플리즈아이디스')
        const replies = replies_ids.reduce((replies, reply_id) => {
            const replyIndex = allReplies.findIndex((reply) => {
                return reply._id === reply_id
            })
            if(replyIndex === -1){ return replies }
            console.log('reliyindex : ', replyIndex)
            console.log('해당 reply : ', allReplies[replyIndex])
            return [allReplies[replyIndex], ...replies]
        }, [])

        const repliesByDate = [...replies].sort((a, b) => {
            return new Date(a.createdDate) - new Date(b.createdDate)
        })

        comment.replies = repliesByDate
        return comment
    })

    const commentsWithRepliesByDate = [...commentsWithReplies].sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate)
    })

    return commentsWithRepliesByDate
}

const mapStateToProps = (state, ownProps) => {
    const isPostsLoaded = state.posts.isLoaded
    const currentPost = (function () {
        if(!isPostsLoaded) { return undefined }
        const allPosts = fp.cloneDeep(state.posts.items)
        const currentPost_id = Number(ownProps.match.params._id)
        const currentPost = getPost(allPosts, currentPost_id)
        
        const allComments = fp.cloneDeep(state.posts.comments)
        const allReplies = fp.cloneDeep(state.posts.replies)
        const currentComments = getComments(allComments, currentPost.comments, allReplies)
        
        currentPost.comments = currentComments

        console.log(currentComments, '이게완성된 코멘트인데?')

        return currentPost
    })()


    return ({
        post : currentPost
    })
}

const PostPageContainer = connect(mapStateToProps, null)(PostPage)

export default PostPageContainer