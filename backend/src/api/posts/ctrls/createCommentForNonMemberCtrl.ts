import { Request, Response } from 'express'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import * as commentConfig from '~configs/comment.config.json'
import textValidator from '~modules/textValidator'
import Encryption from '~modules/Encryption'

const writeCommentForNonMemberCtrl = (req : Request, res : Response) : void => {
    (async function (){
        try{
            const { description, password } = req.body
            const isBadRequest : boolean = (
                (!description) ||
                (description.constructor !== String) ||
                (!textValidator.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||

                (!password) ||
                (password.constructor !== String) ||
                (!textValidator.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||
                (!textValidator.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX))
            )
            if(isBadRequest) { return res.sendStatus(400) }
            
            const post_id : string = req.params._id
            const post = await Post.findOne({ _id : Number(post_id) })
            if(!post) { return res.sendStatus(410) }

            const pwSet = await Encryption.getPwSet(password)
            // add comment
            const comment = (await new Comment({
                post_id,
                isMember : false,
                isAdmin : false,
                description,
                key : {
                    hash : pwSet.hash,
                    salt : pwSet.salt
                }
            }).save()).toObject()

            // add post
            const updateOptions = { $push : { comments : comment._id }}
            const updateResult = await post.update(updateOptions)
            if(updateResult.ok !== 1){ return res.sendStatus(500) }

            return res.status(201).json(JSON.stringify({
                comment : {
                    post_id : comment.post_id,
                    _id : comment._id,
                    isMember : comment.isMember,
                    isAdmin : comment.isAdmin,
                    description : comment.description
                }
            }))
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    })()
}

export default writeCommentForNonMemberCtrl