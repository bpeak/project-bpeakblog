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

users.patch('/me/profileImgSrc', fileToBufferMiddleware.single('profileImgFile'), ctrls.updateUserProfileImgCtrl)
users.patch('/me/password', tokenValidationMiddleware, ctrls.updateUserPasswordCtrl)

users.patch('/user/details', (req, res) => {

})

export default users