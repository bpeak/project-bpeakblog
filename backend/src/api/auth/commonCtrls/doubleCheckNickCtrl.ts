import { Request, Response } from 'express'
import User from '~db/models/user'
import textValidator from '~modules/textValidator'
import * as userConfig from '~configs/user.config.json'

const doubleCheckNickCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response>{
        try{
            const { nick } = req.body

            const isBadRequset = (
                !nick ||
                !textValidator.validateBlank(String(nick)) ||
                !textValidator.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||
                !textValidator.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX)
            )
        
            if(isBadRequset){
                return res.status(400).json({
                    isSuccess : false,
                    errMsg : '잘못된 요청입니다.'
                })
            }
            
            const condition = { nick : String(nick) }
            const userByNick = await User.findOne(condition).lean()
            const isAvailable = userByNick === null ? true : false

            return res.json(JSON.stringify({
                isSuccess : true,
                isAvailable
            }))
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                isSuccess : false,
                errMsg : '서버오류입니다.'
            })
        }
    })()
}

export default doubleCheckNickCtrl