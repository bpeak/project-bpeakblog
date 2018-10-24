import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { naverConfig } from '~configs/secret/secret.config'
import uniqueStringMaker from '~modules/uniqueStringMaker'
import User from '~db/models/user'
import TokenManager from '~modules/TokenManager'
import * as memberTypes from '~constants/memberTypes'
import * as redis from 'redis'
const redisClient = redis.createClient()

const naverCallbackCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise< void | Response > {
        try{
            const { code } = req.query
            const client_id = naverConfig.client_id
            const client_secret = naverConfig.client_secret
            const responseWithToken = await fetch(`https://nid.naver.com/oauth2.0/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&state=123&code=${code}`, {
                method : "POST"
            })
            .then(data => data.json())
            
            const { access_token } = responseWithToken
    
            const response = await fetch('https://openapi.naver.com/v1/nid/me', {
                method : "POST",
                headers : {
                    Authorization: `Bearer ${access_token}`,
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(data => data.json())
            
            if(response.message !== 'success'){ return res.redirect('/SocialErrorPage')}

            const social_id = response.response.id
            const nick = response.response.name
            const gender = response.response.gender
            const profileImgSrc = response.response.profile_image

            const filterOptions = { memberType : memberTypes.NAVER, social_id : social_id }
            const userBySocial_id : any | null = await User.findOne(filterOptions)

            const preUser = userBySocial_id ? {
                isMember : true,
                unique_id : userBySocial_id.unique_id,
                nick : userBySocial_id.nick,
                isAdmin : userBySocial_id.isAdmin,
                profileImgSrc : userBySocial_id.profileImgSrc,
                token : TokenManager.issue(userBySocial_id.unique_id)
            } : {
                isMember : false,
                social_id,
                nick,
                profileImgSrc,
                gender
            }

            const preSocialUser_key : string = uniqueStringMaker()
            res.cookie('preSocialUser_key', preSocialUser_key, { httpOnly : true })
            redisClient.set(preSocialUser_key, JSON.stringify(preUser))
            setTimeout(() => {
                redisClient.del(preSocialUser_key)
            }, 1000 * 60 * 3 + 1000 * 3)
            return res.redirect('/preSocialLogin')
        }
        catch(err){
            console.log(err)
            return res
        }
    })()
}

export default naverCallbackCtrl