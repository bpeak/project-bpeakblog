import { Request, Response } from 'express'
import textValidator from '~modules/textValidator'
import * as commentConfig from '~configs/comment.config.json'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const createReplyForMemberCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        // check body
        const { description } = req.body
        const isBadRequest : boolean = (
            (!description) ||
            (description.constructor !== String) ||
            (!textValidator.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX))
        )
        if(isBadRequest){ return res.sendStatus(400) }

        // is exist comment ?
        const comment_id : number = Number(req.params.comment_id)
        const comment = await Comment.findOne({ _id : comment_id })
        if(!comment){ return res.sendStatus(410) }

        const { user } = req
        // create reply
        const reply = (await new Reply({
            comment_id : comment._id,
            isMember : true,
            isAdmin : user.isAdmin,
            memberAuthor : user._id,
            description
        }).save()).toObject()

        // add reply to comment
        const updateOptions = { $push : { replies : reply._id }}
        const updateResult = await comment.update(updateOptions)
        if(updateResult.ok !== 1){ return res.sendStatus(500) }

        return res.status(201).json(JSON.stringify({
            reply : {
                _id : reply._id,
                comment_id : reply.comment_id,
                isMember : reply.isMember,
                isAdmin : reply.isAdmin,
                createdDate : reply.createdDate,
                description : reply.description,
                memberAuthor : {
                    unique_id : user.unique_id,
                    nick : user.nick,
                    profileImgSrc : user.profileImgSrc
                }
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default createReplyForMemberCtrl