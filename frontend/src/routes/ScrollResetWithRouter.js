import { withRouter } from 'react-router'
import React from 'react'

class ScrollReset extends React.Component {
    componentDidUpdate(prevProps) {
		const prevPathname = prevProps.location.pathname
		const nextPathname = this.props.location.pathname
		const prevQueryParams = decodeURIComponent(prevProps.location.search)
		const nextQueryParams = decodeURIComponent(this.props.location.search)
		if(
			(prevPathname !== nextPathname) ||
			(prevQueryParams!== nextQueryParams)
		){
			window.scrollTo(0, 0)
		}
	}

    render() {
		return this.props.children
    }
}

export default withRouter(ScrollReset)