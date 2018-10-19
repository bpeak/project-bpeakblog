import { Request, Response, NextFunction, Router } from "express"
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'

const posts : Router = Router()

const bodyCheckMiddleware = (targetBodys : object) => {
    console.log(targetBodys, '타겟바디')
    return (req : Request, res : Response, next : NextFunction) => {

    }
}

// const bodyCheckMiddleware = ({
    
// }) => {
//     여기서두가지 선택권이 있는데...
//     하나는 comment_edit 이런식으로 체크타입을 줘서 그거에대한 정의를 해놓고 그거대로 수행하기
//     또하나는 comment 체크타입을쓰고
//     어떤값을 체크할건지 쓰기가있는데
//     내경우에는후자의경우가 편할듯?
// }


// posts.post('/test', bodyCheckMiddleware({
//     name : 'comment',
//     field : {
//         'description'
//     }
// }), (req : any, res : any, next : any) => {
//     res.send('성공했당')
// })


posts.get('/', ctrls.readPosts)
posts.patch('/:_id/view', ctrls.updatePostViews)
posts.post('/:_id/comment', (req : Request, res : Response, next : NextFunction) : any => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){
        return ctrls.createCommentForNonMemberCtrl(req, res)
    } else {
        return next()
    }
}, tokenValidationMiddleware, ctrls.createCommentForMemberCtrl)
// posts.delete('/:_id/comment/:comment_id', (req : Request, res : Response, next : any) => {
//     const isAsMember = req.query.isAsMember === 'true' ? true : false
//     if(!isAsMember){ return ctrls.deleteCommentForNonMemberCtrl(req, res) }
//     next()
// }, tokenValidationMiddleware, ctrls.deleteCommentForMemberCtrl)

// posts.patch('/post/comment/:comment_id/forNonMember', ctrls.editCommentForNonMemberCtrl)

posts.post('/post/comment/:comment_id/reply', (req : Request, res : Response, next : any) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){ return ctrls.createReplyForNonMemberCtrl(req, res) }
    return next()
}, tokenValidationMiddleware, ctrls.createReplyForMemberCtrl)

export default posts