import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//styles
import classNames from 'classnames/bind'
import styles from './ModalBlogMenu.scss'
const cx = classNames.bind(styles)

const modalRoot = document.getElementById('modal-root')

const ModalBlogMenu = ({
    isOpend,
    close,
    userState
}) => {
    return ReactDOM.createPortal(
        <div onClick={close} className={cx('ModalBlogMenu-wrapper', { active : isOpend } )}>
            <nav className={cx('ModalBlogMenu', { active : isOpend })}>
                <Link to='/'>HOME</Link>
                <Link to="/Posts">POSTS</Link>
                <Link to="/Visitors">VISITORS</Link>
                {userState.isAdmin && <Link to="/Admin">ADMIN</Link>}
            </nav>
        </div>,
        modalRoot
    )
}

ModalBlogMenu.propTypes = {
    isOpend : PropTypes.bool.isRequired,
    close : PropTypes.func.isRequired
}

export default ModalBlogMenu