import React from 'react'
import { NavLink, Route } from 'react-router-dom'
//styles
import classNames from 'classnames/bind'
import styles from './AdminPage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
//admin containers
import PostEditorContainer from './containers/PostEditorContainer'
import ResourceManagerContainer from './containers/ResourceManagerContainer'
import InWritingPostsContainer from './containers/InWritingPostsContainer'

const AdminPage = () => {
    return (
        <MainTemplate>
        <div className={cx('AdminPage')}>
            <header>ADMIN</header>
            <nav>
                <NavLink to="/admin/write" activeClassName={cx('active')}>새글</NavLink>
                <NavLink to="/admin/inWritingPosts">작성중인 글</NavLink>
                <NavLink to="/admin/resourceManager" activeClassName={cx('active')}>리로스관리</NavLink>
            </nav>
            <main>
                <Route exact path="/admin/:mode(write|edit)/:post_id?" component={PostEditorContainer}/>
                <Route exact path="/admin/inWritingPosts" component={InWritingPostsContainer}/>
                <Route exact path="/admin/resourceManager" component={ResourceManagerContainer}/>
            </main>
        </div>
        </MainTemplate>
    )
}

export default AdminPage