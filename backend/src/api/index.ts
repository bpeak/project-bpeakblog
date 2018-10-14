import { Router } from "express"
import auth from './auth'
import posts from './posts'
import visitorCards from './visitorCards'
import users from './users'
import admin from './admin'

const api : Router = Router()

api.use('/auth', auth)
api.use('/posts', posts)
api.use('/visitorCards', visitorCards)
api.use('/users', users)
api.use('/admin', admin)




const someAsyncAction = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('some async action ... ')
            resolve()
        }, 1500)
    })
}

const validationMiddleware = async (req : any, res : any, next : any) => {
    console.log('검증시작')
    await someAsyncAction()
    req.user = { a : 1 }
    console.log('검증완료 => return next()')
    return true
}  

const memberCommentCtrl = async (req : any, res : any) => {
    console.log(req.user)
    await someAsyncAction()
    return res.send('member Comment added Success')
}

const nonMemberCommentCtrl = async (req : any, res : any) => {
    await someAsyncAction()
    return res.send('non-Member Comment added Success')
}

const validateToken = async (req : any) => {
    console.log(req, '얘 검증하면 되는거지')
    console.log('.... 검증중 ....')
    await someAsyncAction()
    const result = true
    console.log('검증결과리턴')
    return result
}

api.get('/comment', async (req, res, next) => {
    const { isAsMember } = req.body
    if(isAsMember){
        console.log('멤버로 작성 => 검증')
        const result = await validateToken('토큰')
        console.log(result, '결과값에따라 다르게 응답합니다.')
        if(result){
            console.log('검증성공 => 처리')
            memberCommentCtrl(req, res)
        } else {
            console.log('검증실패 => 410 리턴')
            return res.sendStatus(410)
        }
    } else {
        console.log('comment as non-Member')
        nonMemberCommentCtrl(req, res)
    }
})










export default api