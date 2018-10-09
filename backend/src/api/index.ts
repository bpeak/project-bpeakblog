import { Router } from "express"
import auth from './auth'
import posts from './posts'
import visitorCards from './visitorCards'
import admin from './admin'

const api : Router = Router()
api.use('/auth', auth)
api.use('/posts', posts)
api.use('/visitorCards', visitorCards)
api.use('/admin', admin)

export default api