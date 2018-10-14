import { Request, Response } from "express"
import User from '~db/models/user'
import Encryption from '~modules/Encryption'
import * as memberTypes from '~constants/memberTypes'
import TokenManager from '~modules/TokenManager'

const loginCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response> {
        try{
            const { email, password } = req.body

            const isBadRequest = (
                !email ||
                !password
            )

            if(isBadRequest){ return res.status(400).json(JSON.stringify({})) }
    
            const user = await User.findOne({
                email : String(email),
                memberType : memberTypes.LOCAL
            }).lean()
    
            if(user === null){ return res.status(200).json(JSON.stringify({
                isSuccess : false,
                errMsg : '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'
            }))}
    
            const currentHash = Encryption.getHash(String(password), user.key.salt)
            const dbHash = user.key.hash
    
            if(currentHash === dbHash){
                const token = TokenManager.issue(user.unique_id)
                return res.status(200).json(JSON.stringify({
                    isSuccess : true,
                    user : {
                        token,
                        isAdmin : user.isAdmin,
                        unique_id : user.unique_id,
                        nick : user.nick,
                        profileImgSrc : user.profileImgSrc
                    }
                }))
            } else {
                return res.status(200).json(JSON.stringify({
                    isSuccess : false,
                    errMsg : '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'
                }))
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default loginCtrl