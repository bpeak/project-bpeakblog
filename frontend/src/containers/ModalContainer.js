import React from 'react'
import { connect } from 'react-redux'
//actions
import * as modalsActionCreators from '~redux/modals/actionCreators'
//components
import ModalBlogMenu from '~components/molecules/ModalBlogMenu/ModalBlogMenu'

const mapStateToProps = (state) => ({
    userState : {
        isAdmin : state.user.isAdmin
    },
    modalsState : {
        isOpendModalBlogMenu : state.modals.isOpendModalBlogMenu
    }
})

const mapDispatchToProps = (dispatch) => ({
    modalsActions : {
        closeModalBlogMenu : () => { dispatch(modalsActionCreators.closeModalBlogMenu()) }
    }
})

class ModalContainer extends React.PureComponent{

    render(){
        return (
            <ModalBlogMenu
            isOpend={this.props.modalsState.isOpendModalBlogMenu}
            close={this.props.modalsActions.closeModalBlogMenu}
            userState={this.props.userState}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)