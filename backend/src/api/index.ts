import { Router } from "express"
import auth from './auth'
import posts from './posts'
import admin from './admin'

const api : Router = Router()
api.use('/auth', auth)
api.use('/posts', posts)
api.use('/admin', admin)

export default api