import React, { Component } from 'react'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import App from './App'
//modules
import fetchCreator from '~modules/fetchCreator'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'

const mapStateToProps = (state) => ({
    postsState : state.posts,
    userState : state.user,
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
        }, 'Posts 요청')
    }

    _getPostsForAdmin = () => {
        const { userState } = this.props
        return fetchCreator('/api/admin/posts', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`
            }
        }, 'Posts (for admin) 요청')
    }

    async componentDidMount(){
        // const { userState } = this.props
        // const response = userState.isAdmin && confirm('작성중인 글도 불러올까요?') 
        // ? await this._getPostsForAdmin() 
        // : await this._getPosts()
        // if(!response) { return }

        // const posts = response.posts.map((post) => {
        //     post.description = draftToHtml(post.contentState)
        //     delete post.contentState
        //     return post
        // })


        // this.props.postsActions.postsReceived({
        //     posts, 
        //     comments : response.comments,
        //     replies : response.replies,
        //     date : Number(new Date()),
        // })
    }

    render() {
        return (
            <App

            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)