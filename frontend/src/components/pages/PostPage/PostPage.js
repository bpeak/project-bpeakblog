import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//modules
import dateConverter from '~modules/dateConverter'
import history from '~modules/history'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import ProfileImg from '~components/atoms/ProfileImg/ProfileImg'
import PostComments from '~components/organisms/PostComments/PostComments'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './PostPage.scss'
const cx = classNames.bind(styles)

class PostPage extends React.PureComponent{
    _handleOnBtnTagClick = (e) => {
        const tag = e.currentTarget.id
        history.push(`/posts/tag?keyword=${tag}`)
    }

    render() {
        const { 
            post,
            comments,
            replies
        } = this.props
        const {
            _handleOnBtnTagClick
        } = this

        return (
            <MainTemplate title={post && post.title}>
                <div className={cx('PostPage')}>
                    {post === undefined ? <div className={cx('spinner-container')}><LargeSpinner/></div>
                    :<Fragment>
                    {post === null ? <div className={cx('postNull-container')}>존재하지 않는 포스트입니다</div>
                    
                    : <article className={cx('post')}>
                        <div className={cx('authorAndDate')}>
                            <div className={cx('ProfileImg-container')}>
                                <ProfileImg isMember={true} imgSrc={post.author.profileImgSrc}/>
                            </div> 
                            <div className={cx('nickAndDate')}>
                                <span className={cx('nick')}>{post.author.nick}</span>
                                <span className={cx('date')}>{dateConverter.getFullTimeStamp(post.createdDate)}</span>
                            </div>
                        </div>
                        <div className={cx('title')}>{post.title}</div>
                        {post.coverImgSrc 
                        && <img className={cx('cover')} src={post.coverImgSrc}/>
                        }
                        <div className={cx('intro')}>{post.intro}</div>
                        <div className={cx('description')} dangerouslySetInnerHTML={ {__html: post.description } }></div>
                        <div className={cx('tags')}>
                        {[...post.tags, ...post.tags,...post.tags, ...post.tags].map((tag, index) => {
                                return <button id={tag} onClick={_handleOnBtnTagClick} key={index}>{tag}</button>
                        })}       
                        </div>
                        <div className={cx('comments')}>
                            <PostComments
                                post_id={post._id}
                                comments={post.comments}
                            />
                        </div>
                    </article>}
                    
                    </Fragment>}
                </div>                        
            </MainTemplate>
        )
    }
}

PostPage.propTypes = {
    post : PropTypes.object,
    comments : PropTypes.array,
    replies : PropTypes.array
}

export default PostPage

