import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'
//modules
import fetchCreator from '~modules/fetchCreator'
//components
import PostCommentForm from '~components/molecules/PostCommentForm/PostCommentForm'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = (dispatch) => ({
    postsActions : {
        postCommentAdded : (payload) => { dispatch(postsActionCreators.postCommentAdded(payload)) }
    }
})

class PostCommentFormContainer extends Component {

    _createComment = (comment) => {
        const { userState } = this.props
        const post_id = this.props.target._id
        const body = userState.isLoggedIn ? {
            description : comment.description
        } : {
            description : comment.description,
            password : comment.password
        }
        return fetchCreator(`/api/posts/${post_id}/comment?isAsMember=${userState.isLoggedIn}`, {
            method : "POST",
            headers : {
                'content-type' : 'application/json',
                Authorization : `Bearer ${userState.token}`,
            },
            body : JSON.stringify(body)
        }, `코멘트 등록 (${userState.isLoggedIn ? '회원' : '비회원'})`)
    }

    handleNewComment = async (comment) => {
        const { target } = this.props
        if(target.type === 'post'){
            const response = await this._createComment(comment)
            if(!response) { return }
            this.props.postsActions.postCommentAdded({ comment : response.comment })
        } else if ( target.type === 'comment'){

        }
    }

    render() {
        return (
            <PostCommentForm
            isLoggedIn={this.props.userState.isLoggedIn}
            handleNewComment={this.handleNewComment}
            />
        )
    }
}

PostCommentFormContainer.propTypes = {
    target : PropTypes.shape({
        type : PropTypes.string.isRequired,
        _id : PropTypes.number.isRequired
    }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentFormContainer)