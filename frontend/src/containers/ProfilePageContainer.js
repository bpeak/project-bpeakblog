import React from 'react'
import { connect } from 'react-redux'
//components
import ProfilePage from '~components/pages/ProfilePage/ProfilePage'

const mapStateToProps = (state) => ({
    userState : state.user
})

const mapDispatchToProps = () => ({

})

class ProfilePageContainer extends React.PureComponent {
    render() {
        return (
            <ProfilePage
            userState={this.props.userState}
            />
        )
    }
}

export default connect(mapStateToProps, null)(ProfilePageContainer)