import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import draftToHtml from 'draftjs-to-html'
//modules
import fetchCreator from '~modules/fetchCreator'
import uniqueStringMaker from '~modules/uniqueStringMaker'
//actions
import * as postsActionCreators from '~redux/posts/actionCreators'
import * as popupsActionCreators from '~redux/popups/actionCreators'

console.log(popupsActionCreators)

const mapStateToProps = (state) => ({
    postsState : state.posts,
    userState : state.user,
})

const mapDispatchToProps = (dispatch) => ({
    postsActions : {
        postsReceived : (payload) => dispatch(postsActionCreators.postsReceived(payload)),
    },
    popupsActions : {
        openPopup : (payload) => dispatch(popupsActionCreators.openPopup(payload))
    }
})
class PostsDataRequest extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            isFetching : false
        }
    }

    _msDiffMax = 1000 * 60 * 60 * 6 // 6 hours

    _setIsFetchingWithPromise = (isFetching) => {
        return new Promise((resolve) => {
            this.setState({ isFetching }, () => {
                resolve()
            })
        })
    }

    _getPosts = () => {
        return fetchCreator('/api/posts', {
            method : "GET"
        }, 'Posts 요청')
    }

    _getPostsForAdmin = () => {
        const { userState } = this.props
        return fetchCreator('/api/admin/posts', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`
            }
        }, 'Posts (for admin) 요청')
    }

    _updatePosts = async (d) => {
        await this._setIsFetchingWithPromise(true)
        const { userState } = this.props
        const response = userState.isAdmin && confirm('작성중인 글도 불러올까요?') 
        ? await this._getPostsForAdmin() 
        : await this._getPosts()
        if(!response) { return }

        const posts = response.posts.map((post) => {
            post.description = draftToHtml(post.contentState)
            delete post.contentState
            return post
        })
        const comments = response.comments
        const replies = response.replies

        this.props.postsActions.postsReceived({
            posts,
            comments,
            replies,
            date : Date.now()
        })
        await this._setIsFetchingWithPromise(false)        
    }

    componentDidUpdate(){
        if(this.state.isFetching){ return }

        const { postsState } = this.props
        const { lastUpdatedDate } = postsState
        const { _msDiffMax } = this
        const msDiff = Date.now() - lastUpdatedDate
        if(msDiff > _msDiffMax){
            this._updatePosts(true)
            this.props.popupsActions.openPopup({
                unique_id : uniqueStringMaker(),
                popupType : 'AUTO',
                icon : "notice",
                title : "포스트 데이터 갱신중",
                description : "장시간 새로고침이없어 갱신합니다. 포스트의 변경,추가,삭제가 있을수 있습니다.",
            })
        }
    }

    componentDidMount(){ this._updatePosts() }

    render(){
        return this.props.children
    }
}

const PostsDataRequestContainerWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsDataRequest))

export default PostsDataRequestContainerWithRouter