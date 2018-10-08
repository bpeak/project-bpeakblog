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

export default postsTagAnalyzer