import { Request, Response } from 'express'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import * as commentConfig from '~configs/comment.config.json'
import textValidator from '~modules/textValidator'
import Encryption from '~modules/Encryption'

const deleteCommentForNonMemberCtrl = (req : Request, res : Response) => {
    (async function (){
        try{
            //check body
            const { password } = req.body
            const isBadRequest : boolean = (
                (!password) ||
                (password.constructor !== String) ||
                (!textValidator.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||
                (!textValidator.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX))                
            )
            if(isBadRequest){ return res.sendStatus(400) }

            // is exist comment ? 
            const comment_id : string = req.params.comment_id
            const comment = await Comment.findOne({ _id : Number(comment_id) })
            if(!comment) { return res.sendStatus(410) }
            
            // is exist comment key ?
            const db_comment_hash = comment.key ? comment.key.hash : undefined
            const db_comment_salt = comment.key ? comment.key.salt : undefined
            if(!db_comment_hash || !db_comment_salt){ return res.sendStatus(500) }

            //validate hash
            const current_hash = Encryption.getHash(password, db_comment_salt)
            if(db_comment_hash !== current_hash){
                return res.status(200).json(JSON.stringify({
                    isSuccess : false,
                    errMsg : '비밀번호가 일치하지 않습니다.'
                }))
            }

            // remove comment
            const removeConditions : object = { _id : comment._id }
            await Comment.remove(removeConditions)

            // remove comment in post
            const post_id : string = req.params._id
            const filterOptions = { _id : Number(post_id) }
            const updateConditions = { $pull : { comments : comment._id } }
            await Post.findOneAndUpdate(filterOptions, updateConditions)

            return res.status(200).json(JSON.stringify({
                isSuccess : true
            }))
        }
        catch(err){
            console.log(err)
            return res.sendStatus(500)
        }
    })()
}

export default deleteCommentForNonMemberCtrl