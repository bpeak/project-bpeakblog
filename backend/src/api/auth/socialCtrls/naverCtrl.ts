import { Request, Response } from 'express'
import naverConfig from '~configs/secret/naver.config'

const naverCtrl = (req : Request, res : Response) : void => {
    (async function (){
        try{
            const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverConfig.client_id}&response_type=code&redirect_uri=${naverConfig.redirect_uri}&state=123`
            res.redirect(url)
        }
        catch(err){
            console.log(err)
            res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default naverCtrl