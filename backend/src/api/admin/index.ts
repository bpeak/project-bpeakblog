import { Router } from 'express'
import * as postCtrls from './postCtrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import adminValidationMiddleware from './adminValidationMiddleware'
const admin = Router()

admin.use('*', tokenValidationMiddleware)
admin.use('*', adminValidationMiddleware)

admin.get('/posts', postCtrls.readPostsCtrl)
admin.get('/post/:_id', postCtrls.getPostCtrl)
admin.post('/postImgFile', fileToBufferMiddleware.single('imgFile'), postCtrls.preUploadPostImgFileCtrl)
admin.post('/post', fileToBufferMiddleware.single('coverImgFile'), postCtrls.writePostCtrl)
admin.patch('/post/:_id', fileToBufferMiddleware.single('coverImgFile'), postCtrls.editPostCtrl)

import { Request, Response } from 'express'
admin.post('/post2', async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { category, title, intro, tags, contentState } = req.body
        console.log(category, title, intro, tags, contentState)
        return res
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
})

export default admin