import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import PostsPage from '~components/pages/PostsPage/PostsPage'

const POSTS_COUNT_PER_PAGE = 8

const getCategorizedPosts = (allPosts, category, keyword) => {
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

const getCurrentPagePosts = (categorizedPosts, pageIndex) => {
    const startIndex = POSTS_COUNT_PER_PAGE * (pageIndex - 1)
    const endIndex = POSTS_COUNT_PER_PAGE * pageIndex
    const currentPagePosts = categorizedPosts.slice(startIndex, endIndex)
    return currentPagePosts
}

const getCombinedTags = (posts) => {
    const combinedTags = posts.reduce((combinedTags, post) => {
        combinedTags = combinedTags.concat(post.tags)
        return combinedTags
    }, [])
    return combinedTags
}

const getClassifiedTags = (combinedTags) => {
    const classifiedTags = combinedTags.reduce((classifiedTags, tag) => {
        if(classifiedTags[tag]){
            classifiedTags[tag].num += 1
        } else {
            classifiedTags[tag] = {
                num : 1
            }
        }
        return classifiedTags
    }, {})
    return classifiedTags
}

const getArrayizedTags = (classifiedTags) => {
    const arrayizedTags = []
    for(let key in classifiedTags){
        const tag = {
            name : key,
            num : classifiedTags[key].num
        }
        arrayizedTags.push(tag)
    }
    return arrayizedTags
}

const getSortedTags = (arrayizedTags) => {
    arrayizedTags.sort((a, b) => {
        return b.num - a.num
    })
    return arrayizedTags
}

const postsTagAnalyzer = (posts) => {
    //결합 alltags
    const combinedTags = getCombinedTags(posts)
    //객체화 분류
    const classifiedTags = getClassifiedTags(combinedTags)
    //배열화
    const arrayizedTags = getArrayizedTags(classifiedTags)
    //솔트
    const sortedTags = getSortedTags(arrayizedTags)

    return sortedTags
}

const mapStateToProps = (state, ownProps) => {
    const allPosts = state.posts.items
    if(!allPosts){ return ({ })}

    const {
        category,
        keyword,
        pageIndex,
    } = ownProps
    const analyzedTags = postsTagAnalyzer(allPosts)
    const categorizedPosts = getCategorizedPosts(allPosts, category, keyword)
    const currentPagePosts = getCurrentPagePosts(categorizedPosts, pageIndex)

    const pageCount = Math.ceil(categorizedPosts.length / POSTS_COUNT_PER_PAGE)
    const pages = []
    for(let i = 1; i <= pageCount; i++){
        const page = {
            num : i,
            path : `/posts/${category}/page/${i}`
        }
        pages.push(page)
    }
    
    return ({
        posts : currentPagePosts,
        analyzedTags,
        category,
        keyword,
        pageIndex,
        pages,
    })
}

const PostsPageContainer = connect(mapStateToProps, null)(PostsPage)

export default PostsPageContainer