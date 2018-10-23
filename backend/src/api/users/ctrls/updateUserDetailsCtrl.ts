import { Request, Response } from 'express'
import textValidator from '~modules/textValidator';
import * as userConfig from '~configs/user.config.json'
import User from '~db/models/user';

const updateUserDetailsCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { nick, sex } = req.body
        const isBadRequest : boolean = (
            !nick ||
            !textValidator.validateBlank(nick) ||
            !textValidator.validateMinLength(nick, userConfig.NICK_CHAR_MIN) ||
            !textValidator.validateMaxLength(nick, userConfig.NICK_CHAR_MAX)
        )
        if(isBadRequest){ return res.sendStatus(400) }

        const { user } = req
        if(user.nick !== nick){
            const userByNick = await User.findOne({ nick })
            if(userByNick){
                return res.status(200).json(JSON.stringify({
                    isSuccess : false,
                    errMsg : '이미 존재하는 닉네임 입니다.',
                }))
            }
        }        

        const filterOptions = { _id : user._id }
        const updateOptions = {
            $set : {
                sex,
                nick
            }
        }

        const updatedUser = await User.findOneAndUpdate(filterOptions, updateOptions, { new : true })
        if(!updatedUser){ return res.sendStatus(500) }

        return res.status(200).json(JSON.stringify({
            isSuccess : true,
            user : {
                nick : updatedUser.nick,
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default updateUserDetailsCtrl