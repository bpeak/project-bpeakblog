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

const AdminPage = () => {
    return (
        <MainTemplate>
        <div className={cx('AdminPage')}>
            <header>ADMIN</header>
            <nav>
                <NavLink to="/admin/write" activeClassName={cx('active')}>새글</NavLink>
                <NavLink to="/admin/posts" activeClassName={cx('active')}>포스트관리</NavLink>
            </nav>
            <main>
                <Route exact path="/admin/:mode(write|edit)/:post_id?" component={PostEditorContainer}/>
                <Route exact path="/admin/posts" render={() => ( <div>z123dd</div>)}/>
            </main>
        </div>
        </MainTemplate>
    )
}

export default AdminPage