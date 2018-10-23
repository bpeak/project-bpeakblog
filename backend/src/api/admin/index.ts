import { Router } from 'express'
import * as postCtrls from './postCtrls'
import * as visitorCardCtrls from './visitorCardCtrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import adminValidationMiddleware from './adminValidationMiddleware'
const admin = Router()

admin.use('*', tokenValidationMiddleware)
admin.use('*', adminValidationMiddleware)

// posts
admin.get(   '/posts', postCtrls.readPosts)
admin.post(  '/posts', fileToBufferMiddleware.single('coverImgFile'), postCtrls.createPost)
admin.get(   '/posts/:_id', postCtrls.readPost)
admin.delete('/posts/:_id', postCtrls.deletePost)
admin.patch( '/posts/:_id', fileToBufferMiddleware.single('coverImgFile'), postCtrls.updatePost)
admin.post(  '/postImgFile', fileToBufferMiddleware.single('imgFile'), postCtrls.preUploadPostImgFile)

// visitorCards
admin.delete('/visitorCards/:_id', visitorCardCtrls.deleteVisitorCard)

export default admin