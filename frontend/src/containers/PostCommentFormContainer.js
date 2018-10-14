import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import PostCommentForm from '~components/molecules/PostCommentForm/PostCommentForm'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = () => ({

})

class PostCommentFormContainer extends Component {

    fetchNewComment = () => {

    }

    fetchNewReply = () => {

    }

    render() {
        return (
            <PostCommentForm
            isLoggedIn={this.props.userState.isLoggedIn}
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

export default connect(mapStateToProps, null)(PostCommentFormContainer)