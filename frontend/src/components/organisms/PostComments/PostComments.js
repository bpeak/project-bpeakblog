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
    state = { currentFocusedComment_id : undefined }

    _setCurrentFocusedComment_id = (currentFocusedComment_id) => { this.setState(() => ({ currentFocusedComment_id }))}
    handleOnBtnReplyClick = (comment_id) => { this._setCurrentFocusedComment_id(comment_id) }

    render() {
        const { 
            comments,
            post_id
        } = this.props
        const { currentFocusedComment_id } = this.state
        return (
            <div className={cx('PostComments')}>
                <PostCommentFormContainer target={{ type : 'post', _id : post_id }}/>
                {comments.map((comment) => {
                    return (
                        <PostComment
                        key={comment._id}
                        isUseForm={true}
                        isUseReply={true}
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

// const PostComment = ({
//     comment,
//     isUseForm,
//     isUseReply,
//     isFocused,
//     handleOnBtnReplyClick
// }) => {
//     return (
//         <div className={cx('PostComment')}>
//             <div className={cx('comment')}>
//                 <div className={cx('profileImg-container')}>
//                     <ProfileImg 
//                     isMember={comment.isMember}
//                     isAdmin={comment.isAdmin}
//                     imgSrc={comment.isMember ? comment.memberAuthor.profileImgSrc : undefined}
//                     />
//                 </div>
//                 <div className={cx('contents')}>
//                     <div className={cx('authorAndDate')}>
//                         <span className={cx('author')}>{comment.isMember ? comment.memberAuthor.nick : "익명" }</span>
//                         <span className={cx('date')}>3 days ago</span>
//                     </div>
//                     <div className={cx('description')}>{comment.description}</div>
//                     {isUseForm && 
//                     <div className={cx('btnWrite')}>
//                         <button onClick={handleOnBtnReplyClick}>REPLY</button>
//                     </div>}
//                 </div>            
//             </div>
//             {isUseForm && isFocused &&
//             <div className={cx('form-container')}>
//                 <PostCommentFormContainer target={{ type : 'comment', _id : comment._id }}/>
//             </div>}
//             {isUseReply && comment.replies.length !== 0 &&
//             <div className={cx('replies-container')}>
//                 {comment.replies.map((reply) => {
//                     return (
//                         <PostCommentReply
//                         key={reply._id}
//                         reply={reply}
//                         handleOnBtnReplyClick={handleOnBtnReplyClick}
//                         />
//                     )
//                 })}
//             </div>}
//         </div>
//     )
// }

const PostReply = ({
    reply
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
                    <div className={cx('btnWrite')}>
                        <button onClick={handleOnBtnReplyClick}>REPLY</button>
                    </div>
                </div>            
            </div>
            {isFocused && 
            <div className={cx('form-container')}>
                <PostCommentFormContainer target={{ type : 'comment', _id : comment._id }}/>
            </div>}
            {comment.replies.length !== 0 &&
            <div className={cx('replies-container')}>
                {comment.replies.map((reply) => {
                    return (
                        <PostCommentReply
                        key={reply._id}
                        reply={reply}
                        />
                    )
                })}
            </div>}
        </div>
    )
}

PostComments.propTypes = {
    comments : PropTypes.array.isRequired,
    post_id : PropTypes.number.isRequired
}

// PostComment.propTypes = {
//     comment : PropTypes.shape({
//         isAdmin : PropTypes.bool.isRequired,
//         isMember : PropTypes.bool.isRequired,
//         description : PropTypes.string.isRequired,
//         memberAuthor : PropTypes.object
//     }).isRequired,
//     isFocused : PropTypes.bool.isRequired,
//     handleOnBtnReplyClick : PropTypes.func.isRequired
// }

export default PostComments