import React, { Component } from 'react'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import App from './App'
//modules
import fetchCreator from '~modules/fetchCreator'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'

const mapDispatchToProps = (dispatch) => ({
    postReceived : (payload) => dispatch(postsActionCreators.postReceived(payload))
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
        const a = [ 1,2,3,4,5,6]
        setTimeout(() => {
            this.props.postReceived({ posts })
        }, 1)
    }

    render() {
        return <App/>
    }
}

export default connect(null, mapDispatchToProps)(AppContainer)