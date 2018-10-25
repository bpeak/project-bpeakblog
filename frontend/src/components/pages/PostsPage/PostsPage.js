import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
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

class PostsPage extends React.PureComponent{
    constructor(props){
        super(props)
        const { posts } = this.props
        const innerWidth = window.innerWidth
        const columnCount = this._getColumnCount(innerWidth)
        this.state = {
            columnCount,
            layout : posts ? this._getLayout(posts.length, columnCount) : undefined,
        }
    }

    _setLayOut = (layout) => { this.setState(() => ({ layout }))}
    _setColumnCount = (columnCount) => { this.setState(() => ({ columnCount })) }

    _getStyle = (layout, columnCount) => {
        switch(layout){
            case 'masonry' :
            return ({
                // 'backgroundColor' : "blue",
                'columnCount' : columnCount,
                'columnGap' : '0',
            })
            case 'normal' :
            return ({
                // 'backgroundColor' : 'red',
                'display' : 'flex',
            })
        }
    }

    _getLayout = (postsCount, columnCount) => {
        if(postsCount <= columnCount){
            return 'normal'
        } else {
            return 'masonry'
        }
    }

    _getColumnCount = (innerWidth) => {
        if(innerWidth > 1200){
            return 4
        }
        if(innerWidth > 900){
            return 3
        }
        if(innerWidth > 600){
            return 2
        }
        return 1
    }

    componentWillReceiveProps(nextProps){
        const { posts } = nextProps
        if(posts){
            const innerWidth = window.innerWidth
            const columnCount = this._getColumnCount(innerWidth)
            const layout = this._getLayout(posts.length, columnCount)
            this._setColumnCount(columnCount)
            this._setLayOut(layout)
        }
    }

    _handleOnWindowResize = () => {
        const { posts } = this.props
        if(!posts){ return }
        const innerWidth = window.innerWidth
        const columnCount = this._getColumnCount(innerWidth)
        const layout = this._getLayout(posts.length, columnCount)
        this._setColumnCount(columnCount)
        this._setLayOut(layout)
    }

    componentDidMount(){
        window.addEventListener('resize', this._handleOnWindowResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._handleOnWindowResize)
    }


    render(){
        const {
            posts,
            analyzedTags,
            category,
            keyword,
            pageIndex,
            pages,
        } = this.props

        const {
            _getStyle
        } = this

        const {
            layout,
            columnCount,
        } = this.state

        console.log(this.state)

        if(layout){
            console.log(_getStyle(layout))
        }

        return (
            <MainTemplate title="Post">
                <div className={cx('PostsPage')}>
                    {!posts ? <div className={cx('spinner-container')}><LargeSpinner/></div> 
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
                    {posts.length === 0 && 
                    <div className={cx('notifierPostsNull')}>해당 포스트가 존재하지 않습니다.</div>}

                    {layout && <main style={_getStyle(layout, columnCount)} className={cx('cards')}>
                    {posts.map((post => { return (
                        <div 
                        style={{ width : layout === 'masonry' ? '100%' : (100 / columnCount) + '%' }}
                        key={post._id} 
                        className={cx('PostCard-container')}>
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
                    </main>}

                    <nav className={cx('pagenation')}>
                        {pages.map((page) => {
                            return (
                                <Link
                                    to={page.path}
                                    className={cx({ active : page.num === pageIndex })}
                                    key={page.num}>
                                    {page.num}
                                </Link>
                            )
                        })}
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
    posts : PropTypes.array,
    pages : PropTypes.array,
    analyzedTags : PropTypes.array,
    category : PropTypes.string.isRequired,
    keyword : PropTypes.string,
    pageIndex : PropTypes.number.isRequired,
}

export default PostsPage