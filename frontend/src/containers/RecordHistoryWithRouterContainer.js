import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//routes
import RecordHistoryWithRouter from '~routes/RecordHistoryWithRouter'
//actions
import * as urlHistoryActionCreators from '~redux/urlHistory/actionCreators'

const mapStateToProps = (state) => ({
    urlHistoryState : {
        toAuthPageFrom : state.urlHistory.toAuthPageFrom
    }
})

const mapDispatchToProps = (dispatch) => ({
    enterToAuthPage : (payload) => dispatch(urlHistoryActionCreators.enterToAuthPage(payload))
})

const RecordHistoryWithRouterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordHistoryWithRouter)

export default withRouter(RecordHistoryWithRouterContainer)