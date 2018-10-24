import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import history from '~modules/history'
//styles
import classNames from 'classnames/bind'
import styles from './PostsPage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import PostCard from '~components/molecules/PostCard/PostCard'
import SearchBar from '~components/molecules/SearchBar/SearchBar'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'
//local module
import postsTagAnalyzer from './modules/postsTagsAnalyzer.js'

const POSTS_COUNT_PER_PAGE = 8

class PostsPage extends Component{
    constructor(props){
        super(props)
        this._getCategorizedPosts = (allPosts, category, keyword) => {
            switch(category){
                case 'all' :
                return allPosts
                case 'dev' :
                    const devPosts = allPosts.filter(post => {
                        return post.category === 'dev'
                    })
                return devPosts
                case 'etc' :
                    const etcPosts = allPosts.filter(post => {
                        return post.category === 'etc'
                    })
                return etcPosts
                case 'notice' :
                    const noticePosts = allPosts.filter(post => {
                        return post.category === 'notice'
                    })
                return noticePosts
                case 'search' :
                    const searchPosts = allPosts.filter(post => {
                        return (
                            (post.title.indexOf(keyword)) !== -1 ||
                            (post.intro.indexOf(keyword)) !== -1 ||
                            (post.description.indexOf(keyword)) !== -1 ||
                            (post.tags.indexOf(keyword) !== -1)
                        )
                    })
                return searchPosts
                case 'tag' :
                    const tagPosts = allPosts.filter(post => {
                        return ( post.tags.indexOf(keyword) !== -1 )
                    })
                return tagPosts
            }
        }

        const allPosts = props.posts
        const categorizedPosts = allPosts ? this._getCategorizedPosts(allPosts, props.category, props.keyword) : undefined
        const analyzedTags = allPosts ? postsTagAnalyzer(allPosts) : undefined

        this.state = {
            allPosts,
            categorizedPosts,
            analyzedTags
        }
    }

    _setAllPosts = (allPosts) => { this.setState(() => ({ allPosts }))}
    _setCategorizedPosts = (categorizedPosts) => { this.setState(() => ({ categorizedPosts }))}
    _setAnalyzedTags = (analyzedTags) => { this.setState(() => ({ analyzedTags }))}

    componentWillReceiveProps(nextProps){
        const prevAllPosts = this.state.posts
        const nextAllPosts = nextProps.posts
        if(prevAllPosts !== nextAllPosts){
            const allPosts = nextAllPosts
            const analyzedTags = postsTagAnalyzer(allPosts)
            this._setAllPosts(nextAllPosts)
            this._setAnalyzedTags(analyzedTags)
        }

        const nextCategory = nextProps.category
        const nextKeyword = nextProps.keyword
        const nextCategorizedPosts = this._getCategorizedPosts(nextAllPosts, nextCategory, nextKeyword)
        const prevCategorizedPosts = this.state.categorizedPosts
        if(prevCategorizedPosts !== nextCategorizedPosts){ this._setCategorizedPosts(nextCategorizedPosts) }

        console.log(this.forceUpdate)
    }

    _renderPagenation = () => {
        const pageCount = Math.ceil(this.state.categorizedPosts.length / POSTS_COUNT_PER_PAGE)
        const pageIndex = this.props.pageIndex
        const category = this.props.category
        const buttons = []
        for(let i = 1; i <= pageCount; i++){
            buttons.push(
                <button 
                onClick={() => history.push(`/posts/${category}/page/${i}`)}
                key={i} 
                className={cx({ active : ( i === pageIndex ) })}>
                {i}
                </button>
            )
        }
        return buttons
    }

    _getCurrentPagePosts = (categorizedPosts, pageIndex) => {
        const startIndex = POSTS_COUNT_PER_PAGE * (pageIndex - 1)
        const endIndex = POSTS_COUNT_PER_PAGE * pageIndex
        const currentPagePosts = categorizedPosts.slice(startIndex, endIndex)
        return currentPagePosts
    }

    render(){

        const { category, keyword, pageIndex } = this.props
        const { categorizedPosts, analyzedTags } = this.state
        const { 
            _getCurrentPagePosts,
            _renderPagenation
        } = this

        return (
            <MainTemplate title="Post">
                <div className={cx('PostsPage')}>
                    {!categorizedPosts ? <div className={cx('spinner-container')}><LargeSpinner/></div> 
                    :<Fragment>
                    <nav className={cx('category')}>
                        <li
                        className={cx({ active : (category === 'all') })}
                        onClick={() => { history.push('/posts/all') }}>
                            <span>ALL</span><i className="fas fa-asterisk"></i>
                        </li>
                        <li 
                            className={cx({ active : (category === 'dev')})}
                            onClick={() => { history.push('/posts/dev') }}>
                            <span>DEVELOPMENT</span><i className="fas fa-code"></i>
                        </li>
                        <li
                            className={cx({ active : (category === 'notice') })}
                            onClick={() => history.push('/posts/notice')}>
                            <span>공지</span><i className="fas fa-volume-down"></i>
                        </li>
                        <li 
                            className={cx({ active : (category === 'etc')})}
                            onClick={() => { history.push('/posts/etc') }}>
                            <span>etc</span><i className="fas fa-walking"></i>
                        </li>
                    </nav>
                    <div className={cx('SearchBar-container')}>
                        <SearchBar/>
                    </div>
                    {((category === 'tag') || (category === 'search')) && 
                    <div className={cx('notifierKeyword')}>
                        <span>{category.toUpperCase()} : </span>
                        <span>{keyword}</span>
                    </div>}
                    {categorizedPosts.length === 0 && 
                    <div className={cx('notifierPostsNull')}>해당 포스트가 존재하지 않습니다.</div>}
                    <main className={cx('cards')}>
                    {_getCurrentPagePosts(categorizedPosts, pageIndex).map((post => { return (
                        <div key={post._id} className={cx('PostCard-container')}>
                            <PostCard
                            _id={post._id}
                            isPublished={post.isPublished}
                            author={post.author}
                            category={post.category}
                            coverImgSrc={post.coverImgSrc || undefined}
                            title={post.title}
                            intro={post.intro}
                            tags={post.tags}
                            createdDate={post.createdDate}
                            />
                        </div>
                    )}))}
                    </main>
                    <nav className={cx('pagenation')}> 
                        {_renderPagenation(Math.ceil(categorizedPosts.length / POSTS_COUNT_PER_PAGE), pageIndex)} 
                    </nav>
                    {analyzedTags &&
                    <nav className={cx('tag')}>
                    {analyzedTags.map((tag) => { return (
                        <button 
                        className={cx('tag')} key={tag.name} 
                        onClick={() => { history.push(`/posts/tag?keyword=${tag.name}`) }}>
                            <span className={cx('name')}>{tag.name}</span>
                            <span className={cx('count')}>{tag.num}</span>
                        </button>
                    )})}
                    </nav>}
                    </Fragment>}
                </div>
            </MainTemplate>
        )
    }
}

PostsPage.propTypes = {
    category : PropTypes.string.isRequired,
    keyword : PropTypes.string,
    pageIndex : PropTypes.number.isRequired,
    posts : PropTypes.array
}

export default PostsPage