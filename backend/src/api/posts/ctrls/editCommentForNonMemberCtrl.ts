import { Request, Response } from 'express'
import Comment from '~db/models/comment'
import textValidator from '~modules/textValidator'
import * as commentConfig from '~configs/comment.config.json'
import Encryption from '~modules/Encryption'

const editCommentForNonMemberCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        // check params, body
        const comment_id = Number(req.params.comment_id)
        const { description, password } = req.body
        const isBadRequest : boolean = (
            !Number.isInteger(comment_id) ||
            (!description) ||
            (description.constructor !== String) ||
            (!textValidator.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||
            
            (!password) ||
            (password.constructor !== String) ||
            (!textValidator.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||
            (!textValidator.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX))             
        )
        if(isBadRequest){ return res.sendStatus(400) }

        // is exist comment ?
        const comment = await Comment.findOne({ _id : comment_id })
        if(!comment) { return res.sendStatus(410) }            
        
        // is exist comment key ?
        const db_comment_hash = comment.key ? comment.key.hash : undefined
        const db_comment_salt = comment.key ? comment.key.salt : undefined
        if(!db_comment_hash || !db_comment_salt) { return res.sendStatus(500) }
        
        //validate hash
        const current_hash = Encryption.getHash(password, db_comment_salt)
        if(db_comment_hash !== current_hash){
            return res.status(200).json(JSON.stringify({
                isSuccess : false,
                errMsg : '비밀번호가 일치하지 않습니다.'
            }))
        }        

        // edit comment
        const filterOptions = { _id : comment_id }
        const updateOptions = { $set : { description }}
        await Comment.update(filterOptions, updateOptions)

        return res.status(200).json(JSON.stringify({
            isSuccess : true
        }))            
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default editCommentForNonMemberCtrl 