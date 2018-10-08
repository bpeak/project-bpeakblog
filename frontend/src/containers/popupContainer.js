import React from 'react'
import { connect } from 'react-redux'
import Popup from '~components/molecules/Popup/Popup'
import * as popupActionsCreators from '~redux/popups/actionCreators'

const mapStateToProps = (state) => ({
    popups : state.popups
})

const mapDispatchToProps = (dispatch) => ({
    closePopup : (unique_id) => { dispatch(popupActionsCreators.closePopup(unique_id)) }
})

class popupContainer extends React.Component {
    render() {
        const { popups, closePopup } = this.props
        return popups.map((popup) => {
            return (
                <Popup 
                key={popup.unique_id}
                type={popup.popupType}
                popup={popup}
                closePopup={() => { closePopup({ unique_id : popup.unique_id }) }}
                />
            )
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(popupContainer)