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
        this.state = {
            popularPosts : posts ? this._getPopularPosts(posts) : undefined,
            recentPost : posts ? this._getRecentPost(posts) : undefined,
            recentComments : posts ? this._getRecentComments(posts) : undefined
        }
    }

    POPULAR_POSTS_COUNT = 5
    RECENT_COMMENTS_COUNT = 5

    _setPopularPosts = (popularPosts) => { this.setState(() => ({ popularPosts }))}
    _setRecentPost = (recentPost) => { this.setState(() => ({ recentPost }))}
    _setRecentComments = (recentComments) => { this.setState(() => ({ recentComments }))}

    _getRecentPost = (posts) => {
        const recentPost = posts[0]
        return recentPost
    }

    _getPopularPosts = (posts) => {
        const { POPULAR_POSTS_COUNT } = this
        const popularPosts = posts.reduce((popularPosts, post) => {
            // just push for popularPostsCount
            if(popularPosts.length < POPULAR_POSTS_COUNT) {
                popularPosts.push(post)
                return popularPosts
            }
            
            const minPopularPostOfPopularPosts = popularPosts.reduce((currentMinPopularPost, post) => {
                if(
                    (currentMinPopularPost.views > post.views) ||
                    (
                        (currentMinPopularPost.views === post.views) 
                        &&
                        (Number(new Date(currentMinPopularPost.createdDate)) - Number(new Date(post.createdDate)) > 0)
                    )
                ){
                    return post
                } else {
                    return currentMinPopularPost
                }
            })

            // compare update
            if(
                (post.views > minPopularPostOfPopularPosts.views) ||
                (
                    (post.views === minPopularPostOfPopularPosts.views)
                    &&
                    (Number(new Date(post.createdDate)) - Number(new Date(post.createdDate)) > 0)
                )
            ){
                const beReplacedPostIndex = popularPosts.findIndex((popularPost) => {
                    return popularPost._id === minPopularPostOfPopularPosts._id
                })

                popularPosts.splice(beReplacedPostIndex, 1, post)
                return popularPosts
            } else {
                return popularPosts
            }
        }, [])

        return popularPosts
    }    

    _getRecentComments = (posts) => {
        const { RECENT_COMMENTS_COUNT } = this
        const comments = posts.reduce((comments, post) => {
            return [...comments, ...post.comments]
        }, [])

        const commentsByDate = [...comments].sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate)
        })

        const recentComments = commentsByDate.slice(0, RECENT_COMMENTS_COUNT)
        return recentComments
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

        const prevRecentComments = this.state.recentComments
        const nextRecentComments = this._getRecentComments(posts)
        if(prevRecentComments !== nextRecentComments){ this._setRecentComments(nextRecentComments) }
    }

    render() {
        return (
            <HomePage
            popularPosts={this.state.popularPosts}
            recentPost={this.state.recentPost}
            recentComments={this.state.recentComments}
            />
        )
    }
}

export default connect(mapStateToProps, null)(HomePageContainer)