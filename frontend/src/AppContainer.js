import React, { Component } from 'react'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import App from './App'
//modules
import fetchCreator from '~modules/fetchCreator'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'

const mapStateToProps = (state) => ({
    postsState : state.posts
})

const mapDispatchToProps = (dispatch) => ({
    postsActions : {
        postsReceived : (payload) => dispatch(postsActionCreators.postsReceived(payload)),
        commentsReceived : (payload) => dispatch(postsActionCreators.commentsReceived(payload))
    }
})


class AppContainer extends Component {
    _getPosts = () => {
        return fetchCreator('/api/posts', {
            method : "GET"
        }, '포스트요청')
    }

    async componentDidMount(){
        const response = await this._getPosts()
        if(!response) { return }

        const posts = response.posts.map((post) => {
            post.description = draftToHtml(post.contentState)
            delete post.contentState
            return post
        })

        setTimeout(() => {
            this.props.postsActions.postsReceived({
                posts, 
                comments : response.comments,
                replies : response.replies,
                date : Number(new Date()),
            })
        }, 1)
    }

    render() {
        return <App/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)