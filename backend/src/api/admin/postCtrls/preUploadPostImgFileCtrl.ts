import { Request, Response } from 'express'
import * as redis from 'redis'
const redisClient = redis.createClient()

const preUploadPostImgFileCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response>{
        try{
            const { file } = req
            const { imgDataUrl } = req.body
            const postTempJsonImg = { 
                file, 
                dataUrl : imgDataUrl 
            }
            redisClient.lpush('postTempJsonImgs', JSON.stringify(postTempJsonImg))
            res.status(200).json(JSON.stringify({}))            
            return res
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default preUploadPostImgFileCtrl