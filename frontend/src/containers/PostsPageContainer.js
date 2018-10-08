import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import PostsPage from '~components/pages/PostsPage/PostsPage'

const mapStateToProps = (state) => ({
    posts : state.posts.items
})

class PostsPageContainer extends Component {
    render() {
        return (
            <PostsPage
            posts={this.props.posts}
            category={this.props.category}
            keyword={this.props.keyword}
            pageIndex={this.props.pageIndex}
            />
        )
    }
}

export default connect(mapStateToProps, null)(PostsPageContainer)