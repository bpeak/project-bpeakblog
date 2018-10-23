import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
//assets
import starImgSrc from '~assets/star.png'
import clockImgSrc from '~assets/clock.png'
//modules
import history from '~modules/history'
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
                            <h3>Recent Post<img src={clockImgSrc}/></h3>
                            <Link to="/posts">모든포스트 보기</Link>
                        </div>
                        <div className={cx('PostHoriCard-container')}>
                            <PostHoriCard post={recentPost}/>
                        </div>
                        <div className={cx('post-info')}>
                            <h3>Popular Posts<img src={starImgSrc}/></h3>
                            <Link to="/posts">모든포스트 보기</Link>
                        </div>
                        {!popularPosts ? <div className={cx('spinner-container')}><SmallSpinner/></div> :
                        <Fragment>
                        {popularPosts.map((post) => (
                            <div className={cx('PostHoriCard-container')} key={post._id}>
                                <PostHoriCard post={post}/>
                            </div>
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
                                <div 
                                className={cx('PostComment-container')}
                                onClick={() => {history.push(`/post/${comment.post_id}`)}}
                                key={comment._id}>
                                    <PostComment
                                    comment={comment}
                                    isUseForm={false}
                                    isUseReply={false}
                                    />
                                </div>
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