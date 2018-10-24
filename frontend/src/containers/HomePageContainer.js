import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import HomePage from '~components/pages/HomePage/HomePage'

const mapStateToProps = (state) => ({
    postsState : state.posts
})

class HomePageContainer extends Component {
    constructor(props){
        super(props)
        const posts = props.postsState.items
        const comments = props.postsState.comments
        this.state = {
            popularPosts : posts ? this._getPopularPosts(posts) : undefined,
            recentPost : posts ? this._getRecentPost(posts) : undefined,
            noticePosts : posts ? this._getNoticePosts(posts) : undefined,
            recentComments : comments ? this._getRecentComments(comments) : undefined,
        }
    }

    POPULAR_POSTS_COUNT = 5
    RECENT_COMMENTS_COUNT = 10

    _setPopularPosts = (popularPosts) => { this.setState(() => ({ popularPosts }))}
    _setRecentPost = (recentPost) => { this.setState(() => ({ recentPost }))}
    _setNoticePosts = (noticePosts) => { this.setState(() => ({ noticePosts }))}
    _setRecentComments = (recentComments) => { this.setState(() => ({ recentComments }))}

    _getRecentPost = (posts) => {
        const recentPost = posts[0]
        return recentPost
    }

    _getNoticePosts = (posts) => {
        const noticePosts = posts.filter(post => {
            return post.category === 'notice'
        })
        return noticePosts
    }

    _getPopularPosts = (posts) => {
        const postsByViewsAndDate = [...posts].sort((a, b) => {
            if(a.views !== b.views){
                return b.views - a.views
            } else {
                return new Date(a.createdDate) - new Date(b.createdDate)
            }
        })
        const popularPosts = postsByViewsAndDate.slice(0, this.POPULAR_POSTS_COUNT)
        return popularPosts
    }

    _getRecentComments = (comments) => {
        const commentsByCreatedDate = [...comments].sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate)
        })

        const recentComments = commentsByCreatedDate.slice(0, this.RECENT_COMMENTS_COUNT)
        return recentComments
    }

    shouldComponentUpdate(nextProps, nextState){
        const prevPopularPosts = this.state.popularPosts
        const nextPopularPosts = nextState.popularPosts

        const prevRecentPost = this.state.recentPost
        const nextRecentPost = nextState.recentPost

        const prevRecentComments = this.state.prevRecentComments
        const nextRecentComments = nextState.nextRecentComments

        return (
            (prevPopularPosts !== nextPopularPosts) ||
            (prevRecentPost !== nextRecentPost) ||
            (prevRecentComments !== nextRecentComments)
        )
    }

    componentWillReceiveProps(nextProps){
        const posts = nextProps.postsState.items
        if(!posts) { return }

        const prevPopularPosts = this.state.popularPosts
        const nextPopularPosts = this._getPopularPosts(posts)
        if(prevPopularPosts !== nextPopularPosts){ this._setPopularPosts(nextPopularPosts) }

        const prevRecentPost = this.state.recentPost
        const nextRecentPost = this._getRecentPost(posts)
        if(prevRecentPost !== nextRecentPost) { this._setRecentPost(nextRecentPost) }

        const prevNoticePosts = this.state.noticePosts
        const nextNoticePosts = this._getNoticePosts(posts)
        if(prevNoticePosts !== nextNoticePosts){ this._setNoticePosts(nextNoticePosts) }

        const comments = nextProps.postsState.comments
        const prevRecentComments = this.state.recentComments
        const nextRecentComments = comments ? this._getRecentComments(comments) : prevRecentComments
        if(prevRecentComments !== nextRecentComments){ this._setRecentComments(nextRecentComments) }
    }

    render() {
        return (
            <HomePage
            noticePosts={this.state.noticePosts}
            popularPosts={this.state.popularPosts}
            recentPost={this.state.recentPost}
            recentComments={this.state.recentComments}
            />
        )
    }
}

export default connect(mapStateToProps, null)(HomePageContainer)