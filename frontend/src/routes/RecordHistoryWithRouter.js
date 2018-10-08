import { withRouter } from 'react-router'
import React from 'react'

class RecordEnteringToAuthRoute extends React.Component {
	componentWillReceiveProps(nextProps) {
		const prevPathname = this.props.location.pathname
		const nextPathname = nextProps.location.pathname
		if(
			(nextPathname === '/join' || nextPathname === '/login') &&
			(prevPathname !== '/join' && prevPathname !== '/login')
		){
			this.props.enterToAuthPage({ from : prevPathname })
		}
	}
  
    render() {
		return this.props.children
    }
}

export default withRouter(RecordEnteringToAuthRoute)