import React from 'react'
import { connect } from 'react-redux'
//components
import PostPage from '~components/pages/PostPage/PostPage'

const mapStateToProps = (state) => ({
    postsState : state.posts
})

class PostPageContainer extends React.Component{
    constructor(props){
        super(props)
        const posts = props.postsState.items
        const currentPost_id = Number(this.props.match.params._id)
        const currentPost = posts ? this._getPost(posts, currentPost_id) : undefined
        
        const allComments = props.postsState.comments
        const currentComments = currentPost && allComments ? this._getComments(allComments, currentPost.comments) : undefined

        const allReplies = props.postsState.replies
        // const currentReplies = currentPost && currentComments && currentComments.length !== 0 

        this.state = { 
            post : currentPost,
            comments : currentComments,
            replies : undefined,
            isUpdatedView : false
        }
    }

    _setPost = (post) => { this.setState(() => ({ post }))}
    _setComments = (comments) => { this.setState(() => ({ comments }))}
    _setReplies = (replies) => { this.setState(() => ({ replies }))}
    _setIsUpdatedView = (isUpdatedView) => { this.setState(() => ({ isUpdatedView }))} 
    _getPost = (posts, post_id) => {
        const postIndex = posts.findIndex(post => post._id === post_id)
        const post = postIndex === -1 ? null : posts[postIndex]
        return post
    }
    _getComments = (allComments, comments_ids) => {
        const comments = comments_ids.reduce((comments, _id) => {
            const commentIndex = allComments.findIndex((comment) => {
                return _id === comment._id
            })
            if(commentIndex === -1) { return comments }
            const newComments = [allComments[commentIndex], ...comments]
            return newComments
        }, [])

        const commentsByCreatedDate = [...comments].sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate)
        })

        return commentsByCreatedDate
    }

    _getReplies = (allReplies, comments) => {
        const replies_ids = comments.reduce((replies_ids, comment) => {
            const newReplies_ids = [...replies_ids, ...comment.replies]
            return newReplies_ids
        }, [])

        const replies = replies_ids.reduce((replies, _id) => {
            const replyIndex = allReplies.findIndex((reply) => {
                return _id === reply._id
            })
            if(replyIndex === -1) { return replies }
            const newReplies = [allReplies[replyIndex], ...replies]
            return newReplies
        }, [])

        const repliesByCreatedDate = [...replies].sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate)
        })

        return repliesByCreatedDate
    }

    _updatePostView = () => {
        const post_id = this.props.match.params._id
        fetch(`/api/posts/${post_id}/view`, {
            method : "PATCH"
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        const prevPost = this.state.post
        const nextPost = nextState.post
        const prevComments = this.state.comments
        const nextComments = nextState.comments
        return (
            ( prevPost !== nextPost ) ||
            ( prevComments !== nextComments )
        )
    }

    componentWillReceiveProps(nextProps){
        const posts = nextProps.postsState.items
        if(!posts) { return }

        
        const Post = this._getPost(posts, currentPost_id)

        const currentPost_id = Number(nextProps.match.params._id)
        const prevPost = this.state.post
        const nextPost = this._getPost(posts, currentPost_id)

        const prevComments = this.state.comments
        const nextComments = nextPost ? this._getComments(nextProps.postsState.comments, nextPost.comments) : undefined

        const prevReplies = this.state.replies
        const nextReplies = (
            nextPost && 
            nextComments && 
            nextComments.length !== 0 
            ? this._getReplies(nextProps.postsState.replies, nextComments) 
            : undefined
        )

        // state update
        console.log('포스트 동일여부', prevPost === nextPost)
        console.log(prevPost, nextPost, '프리브포스트랑 넥스트포스트')
        console.log('코멘트 동일여부', prevComments === nextComments)
        console.log('리플라이동일여부', prevReplies === nextReplies)

        if(prevComments !== nextComments){ this._setComments(nextComments) }
        if(prevPost !== nextPost){ this._setPost(nextPost) }
        if(prevReplies !== nextReplies){ this._setReplies(nextReplies) }

        // view update
        if(nextPost && !this.state.isUpdatedView){ this._updatePostView() }
    }

    componentDidMount(){
        // view update
        const { post, isUpdatedView } = this.state
        if(post && !isUpdatedView){ this._updatePostView() }
    }

    render(){
        console.log(this.state.replies)
        return (
            <PostPage
            post={this.state.post}
            comments={this.state.comments}
            replies={this.state.replies}
            />
        )
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)