import { Request, Response, Router } from "express"
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'

const posts : Router = Router()

posts.get('/', ctrls.readPosts)
posts.patch('/:_id/view', ctrls.updatePostViews)
posts.post('/:_id/comment', (req : Request, res : Response, next : any) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){ return ctrls.createCommentForNonMemberCtrl(req, res) }
    next()
}, tokenValidationMiddleware, ctrls.createCommentForMemberCtrl)
posts.delete('/:_id/comment/:comment_id', (req : Request, res : Response, next : any) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){ return ctrls.deleteCommentForNonMemberCtrl(req, res) }
    next()
}, tokenValidationMiddleware, ctrls.deleteCommentForMemberCtrl)

posts.patch('/post/comment/:comment_id/forNonMember', ctrls.editCommentForNonMemberCtrl)
export default posts