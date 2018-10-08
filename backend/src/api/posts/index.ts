import { Router } from "express"
import * as ctrls from './ctrls'

const posts : Router = Router()

posts.get('/', ctrls.getAllPostsCtrl)
posts.patch('/post/:_id/view', ctrls.viewUpPostCtrl)

export default posts