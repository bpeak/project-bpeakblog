import { Request, Response } from 'express'
import * as redis from 'redis'
import fetch from 'node-fetch'
import User from '~db/models/user'
import * as memberTypes from '~constants/memberTypes'
import * as path from 'path'
import * as fs from 'fs'
import * as userConfig from '~configs/user.config.json'
import textValidator from '~modules/textValidator'
const redisClient = redis.createClient()

const joinCtrl = (req : Request, res : Response) => {
    (async function () : Promise<Response> {
        try{
            const nick : string  = req.body.nick
            const isBadRequest : boolean = (
                !nick ||
                !textValidator.validateBlank(String(nick)) ||
                !textValidator.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||
                !textValidator.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX)
            )
            if(isBadRequest) { return res.status(400).json(JSON.stringify({})) }

            const preSocialUser_key : string = req.cookies.preSocialUser_key
            const preUser : any = await getPreSocialUser(preSocialUser_key)
            if(!preUser) { return res.status(500).json(JSON.stringify({})) }

            console.log(preUser.social_id, '로가입시크너아님?')
                
            const user : any = (await new User({
                unique_id : String(Number(new Date())),
                isAdmin : false,
                memberType : preUser.memberType,
                social_id : preUser.social_id,
                nick,
                sex : "M"
            }).save())

            const userPath = path.join(global.__rootDir, `/public/users/${user.unique_id}`)
            fs.mkdirSync(userPath)

            if(preUser.profileImgSrc){
                const bufferImg = await fetch(preUser.profileImgSrc).then(data => data.buffer())
                const extName = path.extname(preUser.profileImgSrc)
                const fileName = 'profile' + extName
                fs.writeFileSync(`${userPath}/${fileName}`, bufferImg, 'binary')
                const imgSrc = `/public/users/${user.unique_id}/${fileName}`
                const update = { $set : { profileImgSrc : imgSrc }}
                await user.update(update)
                return res.status(200).json(JSON.stringify({
                    isSuccess : true,
                    user : {
                        unique_id : user.unique_id,
                        nick : user.nick,
                        profileImgSrc : imgSrc,
                        isAdmin : user.isAdmin                        
                    }
                }))
            } else {
                return res.status(200).json(JSON.stringify({
                    isSuccess : true,
                    user : {
                        unique_id : user.unique_id,
                        nick : user.nick,
                        profileImgSrc : user.profileImgSrc,
                        isAdmin : user.isAdmin
                    }
                }))
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

function getPreSocialUser (preSocialUser_key : string) {
    return new Promise(resolve => {
        redisClient.get(preSocialUser_key, (err, reply) => {
            const preUser : any = JSON.parse(reply)
            resolve(preUser)
        })
    })
}

export default joinCtrl