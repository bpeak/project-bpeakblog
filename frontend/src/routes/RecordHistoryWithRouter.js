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
			const currentToAuthPageFrom = nextProps.urlHistoryState.toAuthPageFrom
			const queryParams = decodeURIComponent(this.props.location.search)
			const nextToAuthPageFrom = `${prevPathname}${queryParams}`
			if(currentToAuthPageFrom !== nextToAuthPageFrom) {
				this.props.enterToAuthPage({ from : nextToAuthPageFrom })
			}
		}
	}
  
    render() {
		return this.props.children
    }
}

export default withRouter(RecordEnteringToAuthRoute)