import { withRouter } from 'react-router'
import React from 'react'

class ScrollResetWithRouter extends React.Component {
    componentDidUpdate(prevProps) {
		const prevPathname = prevProps.location.pathname
		const nextPathname = this.props.location.pathname
		const prevKeyword = new URLSearchParams(prevProps.location.search).get('keyword')
		const nextKeyword = new URLSearchParams(this.props.location.search).get('keyword')
		if(
			(prevPathname !== nextPathname) ||
			(prevKeyword !== nextKeyword)
		){
			window.scrollTo(0, 0)
		}
	}

    render() {
		return this.props.children
    }
}

export default withRouter(ScrollResetWithRouter)