import React, { Fragment, Component } from 'react'
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
import ProfilePage from '~components/pages/ProfilePage/ProfilePage'
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
import Test from '~components/pages/Test'

class App extends Component{

    componentDidMount(){
        const isChrome = window.chrome
        if(!isChrome) { return alert('Bpeak Blog 는 현재 크롬외에 다른브라우져를 고려하지 않앗습니다.\n화면이나 데이터가 제대로 출력되지 않을수 있습니다') }
    }

    render(){
        return (
            <Fragment>
                <Router history={history}>
                    <Fragment>
                    <RecordHistoryWithRouterContainer>
                    <ScrollResetWithRouter>
                        <Switch>
                            <Route exact path="/" component={HomePageContainer}/>
                            <Route exact path="/AboutMe" component={AboutMePage}/>
                            <Route exact path="/posts/" component={PostsPageRoute}/>
                            <Route exact path="/posts/:category(all|dev|life|tag|search)" component={PostsPageRoute}/>
                            <Route exact path="/posts/:category(all|dev|life|tag|search)/page/:pageIndex" component={PostsPageRoute}/>
                            <Route exact path="/post/:_id" component={PostPageContainer}/>
                            <Route exact path="/visitors" component={VisitorsPageContainer}/>
                            <Route path="/Profile" component={ProfilePageContainer}/>
                            <Route exact path="/join" component={JoinPageContainer}/>
                            <Route exact path="/login" component={LoginPageContainer}/>
                            <Route path="/preSocialLogin" component={PreSocialLoginPageContainer}/>
                            <Route path="/admin" component={AdminPageContainer}/>
                            <Route exact path="/dd" component={Test}/>
                            <Route exact path="/notFound" component={NotFoundPage}/>
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </ScrollResetWithRouter>
                    </RecordHistoryWithRouterContainer>
                    <ModalContainer/>
                    <PopupContainer/>
                    </Fragment>
                </Router>
            </Fragment>
        )        
    }
}

export default App