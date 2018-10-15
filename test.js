class Comment {
    constructor(_id, description){
        this._id = _id
        this.description = description
        this.replies = [1,2,3]
    }
}

const prevState = [
    {
        _id : 1,
        title : "첫번째포스트",
        comments : [new Comment(1, '첫번째코멘트'), new Comment(2, '두번째코멘트')]
    },
    {
        _id : 2,
        title : "두번째포스트"
    }
]


const nextState = prevState.map((post) => {
    if(post._id === 1){
        const nextComments = [...post.comments]
        nextComments.push(new Comment(3, '이거하나 추가됐거든 '))
        return ({
            ...post,
            comments : nextComments
        })
    } else {
        return ({
            ...post
        })
    }
})


const a = { a : 1}
const b = {... a}
console.log(a)
console.log(b)
console.log(a === b)

// console.log(prevState, '프리브 스테이트')
// console.log(prevState[0].comments,'프리브 스테이트 코멘트')

// console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ,,,,,,,,,,,ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ')

// console.log(nextState, '넥스트스테이트')
// console.log((nextState[0].comments, '넥스트 스테이트 코멘트들'))



// const a = JSON.stringify(nextState)
// const b = JSON.parse(a)
// b[0].comments[0].replies[0] = 100
// console.log(b[0].comments[0], 'b')
// console.log(prevState[0].comments[0], 'prev')
