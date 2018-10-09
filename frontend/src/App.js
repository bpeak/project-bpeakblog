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
import NotFoundPage from '~components/pages/NotFoundPage/NotFoundPage'
import AdminPage from '~components/pages/AdminPage/AdminPage'
import AboutMePage from '~components/pages/AboutMePage/AboutMePage'
//containers
import VisitorsPageContainer from '~containers/VisitorsPageContainer'
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
                        <Route exact path="/AboutMe" component={AboutMePage}/>
                        <Route exact path="/posts/" component={PostsPageRoute}/>
                        <Route exact path="/posts/:category(all|dev|life|tag|search)" component={PostsPageRoute}/>
                        <Route exact path="/posts/:category(all|dev|life|tag|search)/page/:pageIndex" component={PostsPageRoute}/>
                        <Route exact path="/post/:_id" component={PostPageContainer}/>
                        <Route exact path="/visitors" component={VisitorsPageContainer}/>
                        <Route exact path="/join" component={JoinPageContainer}/>
                        <Route exact path="/login" component={LoginPageContainer}/>
                        <Route path="/admin" component={AdminPage}/>
                        <Route path="/preSocialLogin" component={PreSocialLoginPageContainer}/>
                        <Route path="/test" component={Test}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </ScrollResetWithRouter>
                </RecordHistoryWithRouterContainer>
            </Router>
            <PopupContainer/>
        </React.Fragment>
    )
}

export default App