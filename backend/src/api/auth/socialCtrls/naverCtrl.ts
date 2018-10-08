import { Request, Response } from 'express'
import naverConfig from '~configs/secret/naver.config'

const naverCtrl = (req : Request, res : Response) : void => {
    (async function () : Promise< void | Response > {
        try{
            const client_id : string = naverConfig.client_id
            const redirect_uri : string = naverConfig.redirect_uri
            const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=123`
            res.redirect(url)
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default naverCtrl