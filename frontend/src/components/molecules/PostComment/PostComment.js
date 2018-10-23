import React from 'react'
import PropTypes from 'prop-types'
//modules
import dateConverter from '~modules/dateConverter'
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
    isFocused,
    handleOnBtnReplyClick,
    userState,
}) => {
    return (
        <div className={cx('PostComment', { admin : true })}>
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
                        <span className={cx('date')}>{dateConverter.getTimeAgoStamp(comment.createdDate)}</span>
                    </div>
                    <div className={cx('description')}>{comment.description}</div>
                    {isUseForm && comment.replies.length === 0 &&
                    <div className={cx('btnWrite')}>
                        <button className={cx('reply')} onClick={handleOnBtnReplyClick}>REPLY</button>
                        {userState.isAdmin && <button className={cx('delete')}>삭제</button>}
                    </div>}
                </div>            
            </div>
            {isUseForm && comment.replies.length !== 0 &&
            <div className={cx('replies-container')}>
                {comment.replies.map((reply, index) => {
                    return (
                        <PostReply
                        key={reply._id}
                        reply={reply}
                        isLastReply={comment.replies.length - 1=== index}
                        handleOnBtnReplyClick={handleOnBtnReplyClick}
                        />
                    )
                })}
            </div>}            
            {isUseForm && isFocused &&
            <div className={cx('form-container')}>
                <PostCommentFormContainer target={{ type : 'comment', _id : comment._id }}/>
            </div>}
        </div>
    )
}

const PostReply = ({
    reply,
    isLastReply,
    handleOnBtnReplyClick
}) => {
    return (
        <div className={cx('PostComment', 'reply')}>
            <div className={cx('comment')}>
                <div className={cx('profileImg-container')}>
                    <ProfileImg 
                    isMember={reply.isMember}
                    imgSrc={reply.isMember ? reply.memberAuthor.profileImgSrc : undefined}
                    />
                </div>
                <div className={cx('contents')}>
                    <div className={cx('authorAndDate')}>
                        <span className={cx('author')}>{reply.isMember ? reply.memberAuthor.nick : "익명" }</span>
                        <span className={cx('date')}>{dateConverter.getTimeAgoStamp(reply.createdDate)}</span>
                    </div>
                    <div className={cx('description')}>{reply.description}</div>
                    {isLastReply &&
                    <div className={cx('btnWrite')}>
                        <button className={cx('reply')} onClick={handleOnBtnReplyClick}>REPLY</button>
                    </div>}
                </div>            
            </div>
        </div>
    )
}

PostComment.propTypes = {
    comment : PropTypes.shape({
        unique_id : PropTypes.string,
        isAdmin : PropTypes.bool.isRequired,
        isMember : PropTypes.bool.isRequired,
        description : PropTypes.string.isRequired,
        createdDate : PropTypes.string.isRequired,
        memberAuthor : PropTypes.object,
    }).isRequired,
    isUseForm : PropTypes.bool.isRequired,
    isFocused : PropTypes.bool,
    handleOnBtnReplyClick : PropTypes.func
}

PostReply.propTypes = {
    reply : PropTypes.shape({
        isAdmin : PropTypes.bool.isRequired,
        isMember : PropTypes.bool.isRequired,
        description : PropTypes.string.isRequired,
        createdDate : PropTypes.string.isRequired,
        memberAuthor : PropTypes.object
    }).isRequired,
    isLastReply : PropTypes.bool.isRequired,
    handleOnBtnReplyClick : PropTypes.func
}

export default PostComment