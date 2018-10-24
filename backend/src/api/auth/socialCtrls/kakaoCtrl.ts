import { Request, Response } from 'express'
import { kakaoConfig } from '~configs/secret/secret.config'

const kakaoCtrl = (req : Request, res : Response) : void => {
    (async function (){
        try{
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoConfig.client_id}&redirect_uri=${kakaoConfig.redirect_uri}&response_type=code`
            res.redirect(url)
        }
        catch(err){
            console.log(err)
            res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default kakaoCtrl