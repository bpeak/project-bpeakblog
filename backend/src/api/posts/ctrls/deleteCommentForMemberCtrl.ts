import { Request, Response } from 'express'
import Comment from '~db/models/comment'
import Post from '~db/models/post'

const deleteCommentForMemberCtrl = (req : Request, res : Response) : void => {
    (async function () : Promise<Response> {
        try{
            // check params
            const comment_id = Number(req.params.comment_id)
            const post_id = Number(req.params._id)
            const isBadRequest : boolean = (
                !Number.isInteger(comment_id) ||
                !Number.isInteger(post_id)
            )
            if(isBadRequest){ return res.sendStatus(400) }

            // is exist comment ?
            const comment = await Comment.findOne({ _id : comment_id }).lean()
            if(!comment) { return res.sendStatus(410) }            
            
            // validate comment Owner
            const { user } = req
            const comment_user_oid : string = String(comment.memberAuthor)
            const user_oid : string = String(user._id)
            if(comment_user_oid !== user_oid){ return res.sendStatus(403) }

            // remove comment
            await Comment.remove({ _id : comment_id })

            // remove comment in post
            const filterOptions = { _id : post_id }
            const updateConditions = { $pull : { comments : comment._id } }
            await Post.findOneAndUpdate(filterOptions, updateConditions)

            return res.status(200).json(JSON.stringify({
                isSuccess : true
            }))            
        }
        catch(err){
            console.log(err)
            return res
        }
    })()
}

export default deleteCommentForMemberCtrl

