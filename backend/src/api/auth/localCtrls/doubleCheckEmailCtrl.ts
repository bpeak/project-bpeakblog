import { Request, Response } from "express"
import User from '~db/models/user'
import textValidator from '~modules/textValidator'
import * as userConfig from '~configs/user.config.json'
import * as memberTypes from '~constants/memberTypes'

const doubleCheckEmail = (req : Request, res : Response) => {
    (async function() : Promise<Response>{
        const { email } = req.body

        const isBadRequest = (
            !email ||
            !textValidator.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||
            !textValidator.validateBlank(String(email))
        )

        if(isBadRequest){ 
            return res.status(400).json(JSON.stringify({
            isSuccess : false,
            errMsg : '잘못된 요청입니다.'
        }))}
    
        const condition = {
            email : String(email),
            memberType : memberTypes.LOCAL
        }

        const userByEmail : any = await User.findOne(condition).lean()
        const isAvailable : boolean = userByEmail === null ? true : false
        return res.json(JSON.stringify({
            isSuccess : true,
            isAvailable
        }))
    })()

}

export default doubleCheckEmail