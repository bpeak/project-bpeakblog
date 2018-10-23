import { Router } from 'express'
import * as ctrls from './ctrls'

import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import * as userConfig from '~configs/user.config.json'
import textValidator from '~modules/textValidator'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import Encryption from '~modules/Encryption'
import User from '~db/models/user'

const users : Router = Router()

users.use('*', tokenValidationMiddleware)

users.get('/me', tokenValidationMiddleware, ctrls.readUserProfileCtrl)
users.patch('/me/profileImgSrc', tokenValidationMiddleware, fileToBufferMiddleware.single('profileImgFile'), ctrls.updateUserProfileImgCtrl)
users.patch('/me/password', tokenValidationMiddleware, ctrls.updateUserPasswordCtrl)
users.patch('/me/details', tokenValidationMiddleware, ctrls.updateUserDetailsCtrl)

export default users