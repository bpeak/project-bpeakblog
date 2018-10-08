import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import PostPage from '~components/pages/PostPage/PostPage'

const mapStateToProps = (state) => ({
    posts : state.posts.items
})

const PostPageContainer = connect(mapStateToProps, null)(PostPage)

export default PostPageContainer


// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// //components
// import PostPage from '~components/pages/PostPage/PostPage'

// const mapStateToProps = (state) => ({
//     posts : state.posts.items
// })

// class PostPageContainer extends Component {
//     constructor(props){
//         super(props)
//         const posts = props.posts
//         const _id = props.match.params._id
//         const post = (function(){
//             if(!posts) { return undefined }

//             const currentPostIndex = posts.findIndex(post => { return Number(post._id) === Number(_id) })
//             if(currentPostIndex === -1) { return null }

//             return posts[currentPostIndex]
//         })()
//         this.state = { 
//             post,
//             _id
//         }
//     }

//     _setPost = (post) => { this.setState(() => ({ post }))}

//     shouldComponentUpdate(nextProps, nextState){
//         const prevPost = this.state.post
//         const nextPost = nextState.post
//         return prevPost !== nextPost
//     }

//     componentWillReceiveProps(nextProps){
//         const posts = nextProps.posts
//         if(!posts) { return }

//         const _id = nextProps.match.params._id
//         const currentPostIndex = posts.findIndex(post => Number(post._id) === Number(_id))
//         const nextPost = currentPostIndex === -1 ? null : posts[currentPostIndex]
//         const prevPost = this.state.post
//         if(prevPost !== nextPost){ this._setPost(nextPost) }
//     }

//     render() {
//         return ( 
//            <PostPage
//            post={this.state.post}
//            _id={Number(this.state._id)}
//            />
//         )
//     }
// }


// export default connect(mapStateToProps, null)(PostPageContainer)