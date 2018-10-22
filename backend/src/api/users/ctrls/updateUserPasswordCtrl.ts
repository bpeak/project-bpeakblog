import { Request, Response } from 'express'
import textValidator from '~modules/textValidator'
import User from '~db/models/user'
import Encryption from '~modules/Encryption'
import * as userConfig from '~configs/user.config.json'
import * as memberTypes from '~constants/memberTypes'

const updateUserPasswordCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { prevPassword, newPassword } = req.body
        const isBadRequest : boolean = (
            (!newPassword) ||
            (newPassword.constructor !== String) ||
            (!textValidator.validateBlank(newPassword)) ||
            (!textValidator.validateMinLength(newPassword, userConfig.PASSWORD_CHAR_MIN)) ||
            (!textValidator.validateMaxLength(newPassword, userConfig.PASSWORD_CHAR_MAX))
        )
        if(isBadRequest) { return res.sendStatus(400) }

        const { user } = req
        // is local user ? 
        if(user.memberType !== memberTypes.LOCAL){ return res.sendStatus(400) }

        // check prevPassword
        const db_hash = user.key.hash
        const db_salt = user.key.salt

        const current_hash = Encryption.getHash(prevPassword, db_salt)
        if(db_hash !== current_hash){
            return res.status(200).json(JSON.stringify({
                isSuccess : false,
                errMsg : '이전 비밀번호가 일치하지 않습니다.'
            }))
        }

        // update newPassword
        const pwSet = Encryption.getPwSet(newPassword)
        const filterOptions = { _id : user._id }
        const updateOptions = { $set : {
            key : {
                hash : pwSet.hash,
                salt : pwSet.salt,
            }
        }}
        const updatedUser = await User.findOneAndUpdate(filterOptions, updateOptions, { new : true })
        if(!updatedUser) { return res.sendStatus(500) }

        return res.status(200).json(JSON.stringify({
            isSuccess : true
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default updateUserPasswordCtrl