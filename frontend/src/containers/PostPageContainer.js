import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import PostPage from '~components/pages/PostPage/PostPage'

const mapStateToProps = (state) => ({
    posts : state.posts.items
})

const PostPageContainer = connect(mapStateToProps, null)(PostPage)

export default PostPageContainer