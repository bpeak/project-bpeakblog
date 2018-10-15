import React from 'react'
import { connect } from 'react-redux'
//components
import PostPage from '~components/pages/PostPage/PostPage'


import * as postsActionCreators from '~redux/posts/actionCreators'



const mapStateToProps = (state) => ({
    postsState : state.posts
})

const mapDispatchToProps = (dispatch) => ({
    a : () => { dispatch(postsActionCreators.postReceieved('이겜다은거라', '이게뉴데이트라구'))}
})

let a = 1

class PostPageContainer extends React.Component{
    constructor(props){
        console.log('포페컨테이너 컨스트럭터 실해중')
        a = a + 1
        super(props)
        const posts = props.postsState.items
        const currentPost_id = Number(this.props.match.params._id)
        const post = posts ? this._getPost(posts, currentPost_id) : undefined
        this.state = { 
            post,
            a : a,
            posts : posts 
        }
    }

    _setPost = (post) => { this.setState(() => ({ post }))}

    _getPost = (posts, post_id) => {
        console.log('게또 포스트')
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
        console.log(this.state, '현제스테이트')
        console.log(nextProps, '넥스프프롭스')
        // console.log(this.state.post, '리스프프롭할때의 포스트')
        // console.log('리덕스포스트스에 상태변화가 감지되었습니다.!')
        // const posts = nextProps.postsState.items
        // if(!posts) { return }

        // console.log('현재 스테이트는 이것입니다', this.state.post)
        // console.log('다음포스트는 이것입니다 : ', this._getPost(posts, Number(nextProps.match.params._id)))

        // const currentPost_id = Number(nextProps.match.params._id)

        // const prevPost = this.state.post
        // const nextPost = this._getPost(posts, currentPost_id)
        // console.log(prevPost, '원래이거네')
        // console.log(nextPost, '이걸로 새로업뎃뎀')
        // if(prevPost !== nextPost){ this._setPost(nextPost) }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.a()
        }, 3000)
    }

    render(){
        console.log(this.state.post, '현재포스트')
        return (
            <div>
                와씨바
            </div>
            // <PostPage
            // post={this.state.post}
            // />
        )
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)