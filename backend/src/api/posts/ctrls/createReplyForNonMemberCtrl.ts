import { Request, Response } from 'express'
import * as commentConfig from '~configs/comment.config.json'
import textValidator from '~modules/textValidator'
import Encryption from '~modules/Encryption'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const createReplyForNonMemberCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        //check body
        const { description, password } = req.body
        const isBadRequest : boolean = (
            (!description) ||
            (description.constructor !== String) ||
            (!textValidator.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||

            (!password) ||
            (password.constructor !== String) ||
            (!textValidator.validateBlank(password)) ||
            (!textValidator.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX))
        )
        if(isBadRequest) { return res.sendStatus(400) }

        // is exist comment ? 
        const comment_id : number = Number(req.params.comment_id)
        const comment = await Comment.findOne({ _id : comment_id })
        if(!comment) { return res.sendStatus(410) }

        // create reply
        const pwSet = await Encryption.getPwSet(password)
        const reply = ( await new Reply({
            comment_id : comment._id,
            isAdmin : false,
            isMember : false,
            key : {
                hash : pwSet.hash,
                salt : pwSet.salt
            },
            description
        }).save() ).toObject()

        // add reply to comment
        const updateOptions = { $push : { replies : reply._id }}
        const updateResult = await comment.update(updateOptions)
        if(updateResult.ok !== 1){ return res.sendStatus(500) }

        return res.status(201).json(JSON.stringify({
            reply : {
                _id : reply._id,
                comment_id : reply.comment_id,
                isAdmin : reply.isAdmin,
                isMember : reply.isMember,
                description : reply.description,
                createdDate : reply.createdDate
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default createReplyForNonMemberCtrl