import React from 'react'
import { connect } from 'react-redux'
//components
import PostPage from '~components/pages/PostPage/PostPage'

const mapStateToProps = (state) => ({
    postsState : state.posts
})

class PostPageContainer extends React.Component{
    constructor(props){
        super(props)
        const posts = props.postsState.items
        const currentPost_id = Number(this.props.match.params._id)
        const post = posts ? this._getPost(posts, currentPost_id) : undefined
        this.state = { post }
    }

    _setPost = (post) => { this.setState(() => ({ post }))}
    _getPost = (posts, post_id) => {
        const postIndex = posts.findIndex(post => post._id === post_id)
        const post = postIndex === -1 ? null : posts[postIndex]
        return post
    }

    shouldComponentUpdate(nextProps, nextState){
        // const prevPost = this.state.post
        // const nextPost = nextState.post
        // console.log(prevPost, nextPost, '프리브랑 넥스트 비교함')
        // console.log(prevPost === nextPost)
        // return prevPost !== nextPost
        return true
    }

    componentWillReceiveProps(nextProps){
        const posts = nextProps.postsState.items ? [...nextProps.postsState.items] : undefined
        if(!posts) { return }
        
        console.log('변경감지')

        const currentPost_id = Number(nextProps.match.params._id)
        const prevPost = this.state.post
        const nextPost = this._getPost(posts, currentPost_id)

        console.log(prevPost === nextPost)
        console.log(prevPost ,'프리브')
        console.log(nextPost, '넥스트')

        // console.log(prevPost, nextPost, '프리브랑넥스트')
        if(prevPost !== nextPost){ this._setPost(nextPost) }
    }

    componentDidMount(){
        // setInterval(() => {
        //     console.log(this.props.postsState.items)
        // },1000)
    }

    render(){
        return (
            <PostPage
            post={this.state.post}
            />
        )
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)