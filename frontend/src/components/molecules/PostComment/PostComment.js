import React from 'react'
import PropTypes from 'prop-types'
//components
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
//containers
import PostCommentFormContainer from '~containers/PostCommentFormContainer'
//styles
import classNames from 'classnames/bind'
import styles from './PostComment.scss'
const cx = classNames.bind(styles)

const PostComment = ({
    comment,
    isUseForm,
    isUseReply,
    isFocused,
    handleOnBtnReplyClick
}) => {
    return (
        <div className={cx('PostComment')}>
            <div className={cx('comment')}>
                <div className={cx('profileImg-container')}>
                    <ProfileImg 
                    isMember={comment.isMember}
                    isAdmin={comment.isAdmin}
                    imgSrc={comment.isMember ? comment.memberAuthor.profileImgSrc : undefined}
                    />
                </div>
                <div className={cx('contents')}>
                    <div className={cx('authorAndDate')}>
                        <span className={cx('author')}>{comment.isMember ? comment.memberAuthor.nick : "익명" }</span>
                        <span className={cx('date')}>3 days ago</span>
                    </div>
                    <div className={cx('description')}>{comment.description}</div>
                    {isUseForm && 
                    <div className={cx('btnWrite')}>
                        <button onClick={handleOnBtnReplyClick}>REPLY</button>
                    </div>}
                </div>            
            </div>
            {isUseForm && isFocused &&
            <div className={cx('form-container')}>
                <PostCommentFormContainer target={{ type : 'comment', _id : comment._id }}/>
            </div>}
            {isUseReply && comment.replies.length !== 0 &&
            <div className={cx('replies-container')}>
                {comment.replies.map((reply) => {
                    return (
                        <PostCommentReply
                        key={reply._id}
                        reply={reply}
                        handleOnBtnReplyClick={handleOnBtnReplyClick}
                        />
                    )
                })}
            </div>}
        </div>
    )
}

PostComment.propTypes = {
    comment : PropTypes.shape({
        isAdmin : PropTypes.bool.isRequired,
        isMember : PropTypes.bool.isRequired,
        description : PropTypes.string.isRequired,
        memberAuthor : PropTypes.object
    }).isRequired,
    isUseForm : PropTypes.bool.isRequired,
    isUseReply : PropTypes.bool.isRequired,
    isFocused : PropTypes.bool,
    handleOnBtnReplyClick : PropTypes.func
}

export default PostComment