import { Request, Response } from 'express'
import { kakaoConfig } from '~configs/secret/secret.config'
import fetch from 'node-fetch'
import uniqueStringMaker from '~modules/uniqueStringMaker'
import * as redis from 'redis'
import * as memberTypes from '~constants/memberTypes'
import User from '~db/models/user'
const redisClient = redis.createClient()

const kakaoCallbackCtrl = (req : Request, res : Response) : void => {
    (async function (){
        try{
            const { code } = req.query // user kakao login 후 발급된 인증코드
            const client_id = kakaoConfig.client_id
            const redirect_uri = kakaoConfig.redirect_uri
            const responseWithAccessToken = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`, {
                method : "POST"
            })
            .then(data => data.json())

            const { access_token } = responseWithAccessToken

            const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
                method : "POST",
                headers : {
                    Authorization : `Bearer ${access_token}`,
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            })
            .then(data => data.json())

            console.log(response)

            const social_id = response.id
            const preSocialUser_key = uniqueStringMaker()
            res.cookie('preSocialUser_key', preSocialUser_key, { httpOnly : true })
            const conditions = { social_id, memberType : memberTypes.KAKAO }
            const userBySocial_id : any = await User.findOne(conditions)

            const preUser = (function(){
                if(userBySocial_id){
                    return ({
                        isMember : true,
                        social_id,
                        unique_id : userBySocial_id.unique_id,
                        nick : userBySocial_id.nick,
                        profileImgSrc : userBySocial_id.profileImgSrc
                    })
                } else {
                    return ({
                        isMember : false,
                        social_id,
                        nick : response.properties.nickname,
                        memberType : memberTypes.KAKAO,
                        profileImgSrc : response.properties.profile_image
                    })
                }
            })()

            redisClient.set(preSocialUser_key, JSON.stringify(preUser))
            res.redirect('/preSocialLogin')
            setTimeout(() => {
                redisClient.del(preSocialUser_key)
            }, 1000 * 60 * 3 + 1000 * 3)
        }
        catch(err){
            console.log(err)
            //미완
            res.redirect('/error')
        }
    })()
}

export default kakaoCallbackCtrl

