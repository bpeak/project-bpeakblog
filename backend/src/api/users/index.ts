import { Router } from 'express'

import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import * as userConfig from '~configs/user.config.json'
import textValidator from '~modules/textValidator'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import Encryption from '~modules/Encryption'
import User from '~db/models/user'

const users : Router = Router()

users.patch('/user/password', tokenValidationMiddleware, (req, res) => {
    (async function () {
        try{
            const { password } = req.body
            const isBadRequest : boolean = (
                (!password) ||
                (password.constructor !== String) ||
                (!textValidator.validateBlank(password)) ||
                (!textValidator.validateMinLength(password, userConfig.PASSWORD_CHAR_MIN)) ||
                (!textValidator.validateMaxLength(password, userConfig.PASSWORD_CHAR_MAX))
            )
            if(isBadRequest) { return res.sendStatus(400) }

            const user_oid : string = req.user._id
            const pwSet : object = Encryption.getPwSet(password)
            
            const user = User.findOne({ _id : user_oid })
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    })()
})

users.patch('/user/details', (req, res) => {

})

export default users