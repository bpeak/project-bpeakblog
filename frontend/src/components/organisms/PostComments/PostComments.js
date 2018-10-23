import React, { Component } from 'react'
import PropTypes from 'prop-types'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import PostComment from '~components/molecules/PostComment/PostComment'
//containers
import PostCommentFormContainer from '~containers/PostCommentFormContainer'
//styles
import classNames from 'classnames/bind'
import styles from './PostComments.scss'
const cx = classNames.bind(styles)

class PostComments extends Component {
    state = { 
        // currentFocusedTarget : un
        currentFocusedComment_id : undefined 
    }

    _setCurrentFocusedComment_id = (currentFocusedComment_id) => { this.setState(() => ({ currentFocusedComment_id }))}
    
    handleOnBtnReplyClick = (comment_id) => { this._setCurrentFocusedComment_id(comment_id) }

    render() {
        const { 
            comments,
            post_id,
            userState,
        } = this.props
        const { currentFocusedComment_id } = this.state

        return (
            <div className={cx('PostComments')}>
                <PostCommentFormContainer target={{ type : 'post', _id : post_id }}/>
                {comments.map((comment) => {
                    return (
                        <PostComment
                        key={comment._id}
                        userState={userState}
                        isUseForm={true}
                        isHadReplies={comment.length !== 0}
                        isFocused={currentFocusedComment_id === comment._id}
                        handleOnBtnReplyClick={ () => this.handleOnBtnReplyClick(comment._id) }
                        comment={comment}
                        />
                    )
                })}
            </div>
        )
    }
}

PostComments.propTypes = {
    post_id : PropTypes.number.isRequired,
    comments : PropTypes.array.isRequired,
    userState : PropTypes.object.isRequired,
}

export default PostComments