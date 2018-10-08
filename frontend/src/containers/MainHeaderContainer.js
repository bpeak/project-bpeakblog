import React, { Component } from 'react'
import { connect } from 'react-redux'
//actions
import * as urlHistoryActionCreators from '~redux/urlHistory/actionCreators'
//components
import MainHeader from '~components/molecules/MainHeader/MainHeader'

const mapStateToProps = (state) => ({
    storeState : { user : state.user }
})

const mapDispatchToProps = (dispatch) => ({
    urlHistoryActions : { enterToAuthPage : (payload) => dispatch(urlHistoryActionCreators.enterToAuthPage(payload)) }
})

const MainHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(MainHeader)

export default MainHeaderContainer