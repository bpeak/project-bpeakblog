import { Request , Response } from 'express'
import * as jwt from 'jsonwebtoken'
import jwtConfig from '~configs/secret/jwt.config'
import User from '~db/models/user'

//인증부분 수정 필요함...

const tokenValidationMiddleware = (req : Request, res : Response, next : any) => {
    (async function() : Promise<Response> {
        try{
            const token = req.cookies.token
            //토큰 미존재
            if(!token) { return res.status(401).json(JSON.stringify({})) }

            const decoded : any = jwt.verify(token, jwtConfig.secret)
            const unique_id = decoded.user.unique_id
            const user = await User.findOne({ unique_id }).lean()

            //존재하지 않는 유저
            if(!user){
                res.clearCookie("token")
                res.status(401).json(JSON.stringify({}))
            }
            req.user = user
            return next()
        }
        catch(err){
            //검증에러
            console.log(err, '에러한번보자')
            res.clearCookie("token")
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default tokenValidationMiddleware