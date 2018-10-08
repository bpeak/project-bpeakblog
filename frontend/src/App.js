import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
//modules
import history from '~modules/history'
//routes
import RecordHistoryWithRouterContainer from '~containers/RecordHistoryWithRouterContainer'
import ScrollResetWithRouter from '~routes/ScrollResetWithRouter'
import PostsPageRoute from '~routes/PostsPageRoute'
//components
import HomePage from '~components/pages/HomePage/HomePage'
import PostsPage from '~components/pages/PostsPage/PostsPage'
import AdminPage from '~components/pages/AdminPage/AdminPage'
//containers
import PostPageContainer from '~containers/PostPageContainer'
import PostsPageContainer from '~containers/PostsPageContainer'
import JoinPageContainer from '~containers/JoinPageContainer'
import LoginPageContainer from '~containers/LoginPageContainer'
import PopupContainer from '~containers/PopupContainer'
import PreSocialLoginPageContainer from '~containers/PreSocialLoginPageContainer'

import Test from '~components/pages/Test'

const App = () => {
    return (
        <React.Fragment>
            <Router history={history}>
                <RecordHistoryWithRouterContainer>
                <ScrollResetWithRouter>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/posts/" component={PostsPageRoute}/>
                        <Route exact path="/posts/:category(all|dev|life|tag|search)" component={PostsPageRoute}/>
                        <Route exact path="/posts/:category(all|dev|life|tag|search)/page/:pageIndex" component={PostsPageRoute}/>
                        <Route exact path="/post/:_id" component={PostPageContainer}/>
                        <Route exact path="/join" component={JoinPageContainer}/>
                        <Route exact path="/login" component={LoginPageContainer}/>
                        <Route path="/admin" component={AdminPage}/>
                        <Route path="/preSocialLogin" component={PreSocialLoginPageContainer}/>
                        {/* <Route component={Test}/> */}
                    </Switch>
                </ScrollResetWithRouter>
                </RecordHistoryWithRouterContainer>
            </Router>
            <PopupContainer/>
        </React.Fragment>
    )
}

export default App

const arr = [{ a:  1 }, { a : 3 } , { a : 6 }, { a : 1}]

const c = arr.findIndex(x => x.a === 1)
console.log(c)