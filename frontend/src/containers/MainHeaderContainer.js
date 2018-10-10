import React, { Component } from 'react'
import { connect } from 'react-redux'
//actions
import * as urlHistoryActionCreators from '~redux/urlHistory/actionCreators'
import * as modalsActionCreators from '~redux/modals/actionCreators'
//components
import MainHeader from '~components/molecules/MainHeader/MainHeader'

const mapStateToProps = (state) => ({
    userState : state.user,
    modalsState : {
        isOpendModalBlogMenu : state.modals.isOpendModalBlogMenu
    }
})

const mapDispatchToProps = (dispatch) => ({
    urlHistoryActions : { enterToAuthPage : (payload) => dispatch(urlHistoryActionCreators.enterToAuthPage(payload)) },
    modalsActions : { 
        openModalBlogMenu : () => dispatch(modalsActionCreators.openModalBlogMenu()),
        closeModalBlogMenu : () => dispatch(modalsActionCreators.closeModalBlogMenu())
    }
})

class MainHeaderContainer extends React.PureComponent{

    openModalBlogMenu = () => {
        const { modalsState, modalsActions } = this.props
        if(!modalsState.isOpendModalBlogMenu){
            modalsActions.openModalBlogMenu()
        }    
    }

    _closeModalBlogMenu = () => {
        const { modalsState, modalsActions } = this.props
        if(modalsState.isOpendModalBlogMenu){
            modalsActions.closeModalBlogMenu()
        }    
    }

    recordPathBeforeEnteringAuthPage = (path) => {
        const { urlHistoryActions } = this.props
        urlHistoryActions.enterToAuthPage({ from : path })
    }

    componentWillReceiveProps(nextProps){
        const nextDeviceType = nextProps.deviceType
        if(nextDeviceType !== 'MOBILE'){ this._closeModalBlogMenu() }
    }

    componentDidMount(){
        const deviceType = this.props.deviceType
        if(deviceType !== 'MOBILE'){ this._closeModalBlogMenu() }
    }

    render(){
        return (
            <MainHeader
            userState={this.props.userState}
            openModalBlogMenu={this.openModalBlogMenu}
            recordPathBeforeEnteringAuthPage={this.recordPathBeforeEnteringAuthPage}
            deviceType={this.props.deviceType}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderContainer)