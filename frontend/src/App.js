import React, { Fragment, Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
//modules
import history from '~modules/history'
//routes
import RecordHistoryWithRouterContainer from '~containers/RecordHistoryWithRouterContainer'
import ScrollResetWithRouter from '~routes/ScrollResetWithRouter'
import PostsPageRoute from '~routes/PostsPageRoute'
//components
import NotFoundPage from '~components/pages/NotFoundPage/NotFoundPage'
import AboutMePage from '~components/pages/AboutMePage/AboutMePage'
//containers
import HomePageContainer from '~containers/HomePageContainer'
import VisitorsPageContainer from '~containers/VisitorsPageContainer'
import ProfilePageContainer from '~containers/ProfilePageContainer'
import PostPageContainer from '~containers/PostPageContainer'
import JoinPageContainer from '~containers/JoinPageContainer'
import LoginPageContainer from '~containers/LoginPageContainer'
import PopupContainer from '~containers/PopupContainer'
import PreSocialLoginPageContainer from '~containers/PreSocialLoginPageContainer'
import ModalContainer from '~containers/ModalContainer'
import AdminPageContainer from '~containers/AdminPageContainer'

// import PostsDataRequestWithRouter from '~routes/PostsDataRequestWithRouter'

import PostsDataRequestContainerWithRouter from '~containers/PostsDataRequestContainerWithRouter'

class App extends Component{
    render(){
        return (
            <Fragment>
                <Router history={history}>
                    <Fragment>
                        <PostsDataRequestContainerWithRouter>
                        <RecordHistoryWithRouterContainer>
                        <ScrollResetWithRouter>
                            <Switch>
                                <Route exact path="/" component={HomePageContainer}/>
                                <Route exact path="/AboutMe" component={AboutMePage}/>
                                <Route exact path="/posts/" component={PostsPageRoute}/>
                                <Route exact path="/posts/:category(all|dev|etc|notice|tag|search)" component={PostsPageRoute}/>
                                <Route exact path="/posts/:category(all|dev|etc|notice|tag|search)/page/:pageIndex" component={PostsPageRoute}/>
                                <Route exact path="/post/:_id" component={PostPageContainer}/>
                                <Route exact path="/visitors" component={VisitorsPageContainer}/>
                                <Route path="/Profile" component={ProfilePageContainer}/>
                                <Route exact path="/join" component={JoinPageContainer}/>
                                <Route exact path="/login" component={LoginPageContainer}/>
                                <Route path="/preSocialLogin" component={PreSocialLoginPageContainer}/>
                                <Route path="/admin" component={AdminPageContainer}/>
                                <Route exact path="/notFound" component={NotFoundPage}/>
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </ScrollResetWithRouter>
                        </RecordHistoryWithRouterContainer>
                        </PostsDataRequestContainerWithRouter>
                        <ModalContainer/>
                        <PopupContainer/>
                    </Fragment>
                </Router>
            </Fragment>
        )        
    }
}

export default App