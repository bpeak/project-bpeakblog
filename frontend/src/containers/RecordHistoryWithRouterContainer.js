import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//rotues
import RecordHistoryWithRouter from '~routes/RecordHistoryWithRouter'
//actions
import * as urlHistoryActionCreators from '~redux/urlHistory/actionCreators'
const mapDispatchToProps = (dispatch) => ({
    enterToAuthPage : (payload) => dispatch(urlHistoryActionCreators.enterToAuthPage(payload))
})

const RecordHistoryWithRouterContainer = connect(
    null,
    mapDispatchToProps
)(RecordHistoryWithRouter)

export default withRouter(RecordHistoryWithRouterContainer)