import { Router } from 'express'
import * as postCtrls from './postCtrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import adminValidationMiddleware from './adminValidationMiddleware'
const admin = Router()

admin.use('*', tokenValidationMiddleware)
admin.use('*', adminValidationMiddleware)

admin.get('/post/:_id', postCtrls.getPostCtrl)
admin.post('/postImgFile', fileToBufferMiddleware.single('imgFile'), postCtrls.preUploadPostImgFileCtrl)
admin.post('/post', fileToBufferMiddleware.single('coverImgFile'), postCtrls.writePostCtrl)
admin.patch('/post/:_id', fileToBufferMiddleware.single('coverImgFile'), postCtrls.editPostCtrl)

export default admin