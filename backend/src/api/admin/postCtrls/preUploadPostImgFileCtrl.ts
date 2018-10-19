import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

const preUploadPostImgFileCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { file } = req
        const fileName : string = Date.now() + '-' + file.originalname
        const fileTemporaryPath : string = `/public/temporary/postImgs/${fileName}`
        const uploadPath : string = path.join(global.__rootDir, fileTemporaryPath)
        
        fs.writeFileSync(uploadPath, file.buffer, "binary")
        return res.status(201).json(JSON.stringify({ fileTemporaryPath }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default preUploadPostImgFileCtrl