import { Request, Response } from 'express'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import * as commentConfig from '~configs/comment.config.json'
import textValidator from '~modules/textValidator'

const createCommentForMember = async (req : Request, res : Response) : Promise<Response> => {
    try{
        // check body, params
        const { description } = req.body
        const post_id : number = Number(req.params._id)
        const isBadRequest : boolean = (
            (!description) ||
            (description.constructor !== String) ||
            (!textValidator.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||

            !Number.isInteger(post_id)
        )
        if(isBadRequest) { return res.sendStatus(400) }

        // is exist post ?
        const post = await Post.findOne({ _id : post_id })
        if(!post) { return res.sendStatus(410) }

        // create comment
        const { user } = req
        const comment = (await new Comment({
            post_id : post._id ,
            unique_id : user.unique_id,
            isMember : true,
            isAdmin : user.isAdmin,
            description,
            memberAuthor : user._id
        }).save()).toObject()

        // add comment in post
        const updateOptions = { $push : { comments : comment._id }}
        const updateResult = await post.update(updateOptions)
        if(updateResult.ok !== 1){ return res.sendStatus(500) }

        return res.status(201).json(JSON.stringify({
            comment : {
                post_id : comment.post_id,
                _id : comment._id,
                isMember : comment.isMember,
                isAdmin : comment.isAdmin,
                description : comment.description,
                createdDate : comment.createdDate,
                memberAuthor : {
                    nick : user.nick,
                    profileImgSrc : user.profileImgSrc,
                    unique_id : user.unique_id
                },
                replies : comment.replies
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default createCommentForMember
