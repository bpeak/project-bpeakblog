import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
//styles
import classNames from 'classnames/bind'
import styles from './HomePage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import GreetingBox from '~components/molecules/GreetingBox/GreetingBox'
import PostHoriCard from '~components/molecules/PostHoriCard/PostHoriCard'
import PostComment from '~components/molecules/PostComment/PostComment'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'

const HomePage = ({
    popularPosts,
    recentPost,
    recentComments
}) => {
    return (
        <MainTemplate>
            <div className={cx('HomePage')}>
                <GreetingBox/>
                <div className={cx('contents')}>
                    <div className={cx('posts')}>
                        <div className={cx('post-info')}>
                            <h3>Recent Post</h3>
                            <Link to="/posts">모든포스트 보기</Link>
                        </div>
                        <PostHoriCard post={recentPost}/>
                        <div className={cx('post-info')}>
                            <h3>Top 5 Posts</h3>
                            <Link to="/posts">모든포스트 보기</Link>
                        </div>
                        {!popularPosts ? <div className={cx('spinner-container')}><SmallSpinner/></div> :
                        <Fragment>
                        {popularPosts.map((post) => (
                            <PostHoriCard post={post} key={post._id}/>
                        ))}
                        </Fragment>
                        }
                    </div>
                    <div className={cx('comments')}>
                        <h3>Recent Comments</h3>
                    {!recentComments ? <div className={cx('spinner-container')}><SmallSpinner/></div>
                    : <Fragment>
                        {recentComments.map((comment) => {
                            return (
                                <PostComment
                                key={comment._id}
                                comment={comment}
                                isUseForm={false}
                                isUseReply={false}
                                />
                            )
                        })}
                    </Fragment>
                    }
                    </div>                
                </div>
            </div>
        </MainTemplate>
    )
}

export default HomePage