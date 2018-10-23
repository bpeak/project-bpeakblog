import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//modules
import history from '~modules/history'
//styles
import classNames from 'classnames/bind'
import styles from './InWritingPosts.scss'
const cx = classNames.bind(styles)
//components
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'

const InWritingPosts = ({
    posts
}) => {
    return (
        <div className={cx('InWritingPosts')}>
            {!posts ? <div className={cx('spinner-container')}><LargeSpinner/></div> 
            : <Fragment>
            {posts.map((post) => (
                <div className={cx('post')} key={post._id}>
                    <h1>타이틀 : {post.title}</h1>
                    <div>인트로 : {post.intro}</div>
                </div>
            ))}
            </Fragment>}
        </div>
    )
}

InWritingPosts.propTypes = {
    posts : PropTypes.array
}

export default InWritingPosts