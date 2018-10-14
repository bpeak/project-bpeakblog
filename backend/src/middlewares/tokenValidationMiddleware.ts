import { Request , Response } from 'express'
import * as jwt from 'jsonwebtoken'
import jwtConfig from '~configs/secret/jwt.config'
import User from '~db/models/user'

const tokenValidationMiddleware = async (req : Request, res : Response, next : any) => {
    try{
        const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
        //토큰 미존재
        if(!token) { return res.sendStatus(401) }

        const decoded : any = jwt.verify(token, jwtConfig.secret)
        const unique_id = decoded.user.unique_id
        const user = await User.findOne({ unique_id }).lean()

        //존재하지 않는 유저
        if(!user){ return res.sendStatus(401) }

        //인증 성공
        req.user = user
        return next()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(401)
    }
}

export default tokenValidationMiddleware

// import { Request , Response } from 'express'
// import * as jwt from 'jsonwebtoken'
// import jwtConfig from '~configs/secret/jwt.config'
// import User from '~db/models/user'

// const tokenValidationMiddleware =  (req : Request, res : Response, next : any) => {
//     (async function() : Promise<Response> {
//         try{
//             console.log('이거왜동작안해?')
//             const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
//             //토큰 미존재
//             if(!token) { return res.sendStatus(401) }

//             const decoded : any = jwt.verify(token, jwtConfig.secret)
//             const unique_id = decoded.user.unique_id
//             const user = await User.findOne({ unique_id }).lean()

//             //존재하지 않는 유저
//             if(!user){ return res.sendStatus(401) }

//             //인증 성공
//             req.user = user
//             console.log(user, '유저찍고 넥스트하는뎀...')
//             return next()
//         }
//         catch(err){
//             console.log(err)
//             return res.sendStatus(401)
//         }
//     })()
// }

// export default tokenValidationMiddleware