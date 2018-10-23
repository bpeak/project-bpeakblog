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
//styles
import classNames from 'classnames/bind'
import styles from './PostPage.scss'
const cx = classNames.bind(styles)

class PostPage extends React.PureComponent{
    _onBtnTagClick = (e) => {
        const tag = e.currentTarget.id
        history.push(`/posts/tag?keyword=${tag}`)
    }

    _onBtnEditClick = (e) => {
        const { post } = this.props
        history.push(`/admin/edit/${post._id}`)
    }

    _onBtnDeleteClick = async () => {
        const { post } = this.props
        const msg = `post(${post._id} < ${post.title} > 해당포스트를 정말 삭제하시겠습니까?)`
        const confirmed = confirm(msg)
        if(!confirmed){ return }
        const timeStamp = Date.now()
        const result = prompt(`${timeStamp} 데이트넘버를 입력해주세요.`)
        if(result !== String(timeStamp)){ return alert('데이트넘버불일치 취소')}
        const response = await this.props.deletePost()
        if(response.isSuccess){
            alert('삭제완료')
        }
    }

    render() {
        const { 
            userState,
            post,
        } = this.props
        const {
            _onBtnTagClick,
            _onBtnEditClick,
            _onBtnDeleteClick,
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
                            {userState.isAdmin && <button className={cx('edit')} onClick={_onBtnEditClick}>수정</button>}
                            {userState.isAdmin && <button className={cx('delete')} onClick={_onBtnDeleteClick}>삭제</button>}
                        </div>
                        <h1 className={cx('title')}>{post.title}</h1>
                        {post.coverImgSrc 
                        && <img className={cx('cover')} src={post.coverImgSrc}/>
                        }
                        <div className={cx('intro')}>{post.intro}</div>
                        <div className={cx('description')} dangerouslySetInnerHTML={ {__html: post.description } }></div>
                        <div className={cx('tags')}>
                        {[...post.tags, ...post.tags,...post.tags, ...post.tags].map((tag, index) => {
                                return <button id={tag} onClick={_onBtnTagClick} key={index}>{tag}</button>
                        })}       
                        </div>
                        <div className={cx('comments')}>
                            <PostComments
                                post_id={post._id}
                                comments={post.comments}
                                userState={userState}
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
    userState : PropTypes.object.isRequired,
}

export default PostPage

