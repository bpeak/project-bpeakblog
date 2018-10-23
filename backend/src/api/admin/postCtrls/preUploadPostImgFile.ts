import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

const preUploadPostImgFile = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { file } = req
        if(!file){ return res.sendStatus(500) }
        const fileName : string = Date.now() + '-' + file.originalname
        const imgTempSrc : string = `/public/temporary/postImgs/${fileName}`
        const uploadPath : string = path.join(global.__rootDir, imgTempSrc)
        
        fs.writeFileSync(uploadPath, file.buffer, "binary")
        return res.status(201).json(JSON.stringify({ imgTempSrc }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default preUploadPostImgFile