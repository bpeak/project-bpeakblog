import { Request, Response } from 'express'
import fetch from 'node-fetch'
import naverConfig from '~configs/secret/naver.config'

const naverCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<any> {
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
            if(response.message === 'success'){
                const social_id = response.response.id
                const nick = response.response.name
                const gender = response.response.gender
                const profileImgSrc = response.response.profile_image
                console.log(social_id, nick, gender, profileImgSrc)
                return res.redirect('/')
            } else {
                return res.redirect('/social')
            }
        }
        catch(err){
            console.log(err)
            return res
        }
    })()
}

export default naverCtrl