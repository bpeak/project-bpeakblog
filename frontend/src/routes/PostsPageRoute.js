import React from 'react'
import { Redirect } from 'react-router-dom'
//containers
import PostsPageContainer from '~containers/PostsPageContainer'

const PostsPageRoute = (props) => {
    const category = props.match.params.category || 'all'
    const keyword = new URLSearchParams(location.search).get('keyword') || undefined
    const pageIndex = props.match.params.pageIndex || 1

    if((category === 'tag' || category === 'search') && !keyword){ return <Redirect to="/notFound"/> }
    return (
        <PostsPageContainer
        category={category}
        keyword={keyword}
        pageIndex={Number(pageIndex)}
        />
    )
}

export default PostsPageRoute