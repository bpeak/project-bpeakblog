import { Request, Response } from "express"
import User from '~db/models/user'
import Encryption from '~modules/Encryption'
import textValidator from '~modules/textValidator'
import TokenManager from '~modules/TokenManager'
import * as userConfig from '~configs/user.config.json'
import * as memberTypes from '~constants/memberTypes'
import * as sexTypes from '~constants/sexTypes'

const joinCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response> {
        try{
            const { email, nick, sex, password } = req.body
            const isBadRequest : boolean = (
                !email ||
                !textValidator.validateBlank(String(email)) ||
                !textValidator.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||
        
                !nick ||
                !textValidator.validateBlank(String(nick)) ||
                !textValidator.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||
                !textValidator.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX) ||
        
                !password ||
                !textValidator.validateBlank(String(password)) ||
                !textValidator.validateMaxLength(String(password), userConfig.PASSWORD_CHAR_MAX) ||
                !textValidator.validateMinLength(String(password), userConfig.PASSWORD_CHAR_MIN) ||
    
                !sex ||
                !(String(sex) === sexTypes.M || String(sex) === sexTypes.W)
            )
        
            if(isBadRequest) { return res.status(400).json(JSON.stringify({ isSuccess : false, errMsg : '잘못된 요청입니다.' }))}
    
            const userByEmail = await User.findOne({ memberType : memberTypes.LOCAL, email : String(email) }).lean()
            if(userByEmail !== null){ return res.status(400).json(JSON.stringify({ isSuccess : false, errMsg : '이미 존재하는 이메일입니다.' }))}
            const userByNick = await User.findOne({ nick : String(nick) }).lean()
            if(userByNick !== null){ return res.status(400).json(JSON.stringify({ isSuccess : false, errMsg : '이미 존재하는 이메일입니다.' })) }
    
            const isAdmin : boolean = (await User.findOne().lean()) === null
            const { hash, salt } = Encryption.getPwSet(String(password))
            const user = (await new User({
                unique_id : String(Number(new Date())),
                isAdmin,
                memberType : memberTypes.LOCAL,
                nick : String(nick),
                sex : String(sex),
                email : String(email),
                key : {
                    hash,
                    salt
                }
            }).save()).toObject()
    
            const token = TokenManager.issue(user.unique_id)
            return res.status(201).json(JSON.stringify({
                isSuccess : true,
                user : {
                    token,
                    unique_id : user.unique_id,
                    nick : user.nick,
                    profileImgSrc : user.profileImgSrc,
                    isAdmin : user.isAdmin
                }
            }))
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({ isSuccess : false, errMsg : '서버 오류입니다.' }))
        }
    })()
}

export default joinCtrl