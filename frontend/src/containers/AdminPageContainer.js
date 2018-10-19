import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
//components
import AdminPage from '~components/pages/AdminPage/AdminPage'

const mapStateToProps = (state) => ({
    userState : state.user
})

class AdminPageContainer extends Component {
    render() {
        const { userState } = this.props
        if(userState.isAdmin === true){
            return <AdminPage/>
        } else {
            return <Redirect to="/NotFound"/>
        }
    }
}

export default connect(mapStateToProps, null)(AdminPageContainer)