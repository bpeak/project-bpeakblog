import { Router } from "express"
import * as commonCtrls from './commonCtrls'
import * as localCtrls from './localCtrls'
import * as socialCtrls from './socialCtrls'

import fetch from 'node-fetch'
import * as fs from 'fs'
import * as path from 'path'
// // http://k.kakaocdn.net/dn/boL3KE/btqnErozqWo/s9IdPmCmcgZOpJWTJXYl50/profile_640x640s.jpg
// fetch('http://k.kakaocdn.net/dn/boL3KE/btqnErozqWo/s9IdPmCmcgZOpJWTJXYl50/profile_640x640s.jpg')
//     .then(res => res.buffer())
//     .then(buffer => {
//         fs.writeFileSync(path.join(__dirname, '/test.jpg'), buffer, "binary")
//     })

import User from '~db/models/user'

import * as redis from 'redis'
const redisClient = redis.createClient()

const auth : Router = Router()

// ----- common ----- //
auth.post('/doubleCheckNick', commonCtrls.doubleCheckNickCtrl)
// ----- local ----- //
auth.post('/local/join', localCtrls.joinCtrl)
auth.post('/local/login', localCtrls.loginCtrl)
auth.post('/local/doubleCheckEmail', localCtrls.doubleCheckEmailCtrl)
// ----- socia ----- //
auth.get('/social/kakao', socialCtrls.kakaoCtrl)
auth.get('/social/kakao/callback', socialCtrls.kakaoCallbackCtrl)
auth.get('/social/naver', socialCtrls.naverCtrl)
auth.get('/social/naver/callback', socialCtrls.naverCallbackCtrl)

auth.get('/social/google', socialCtrls.googleCtrl)

auth.get('/social/preUser', socialCtrls.getPreUserCtrl)
auth.post('/social/join', socialCtrls.joinCtrl)
// auth.post('/social/join', (req : any, res : any) => {
//     (async function () {
//         try{
//             console.log('안드러와?')
//             const nick = req.nick
//             const preSocialUser_key = req.cookies.preSocialUser_key
//             const preUser = await getPreSocialUser(preSocialUser_key)
//             console.log(preUser, '프리유저찍어봐')
//             const user = (await new User({
//                 unique_id : String(Number(new Date())),
//                 isAdmin : false,
//                 memberType : 'KAKAO',
//                 nick : String(nick),
//                 sex : "M"
//             }).save()).toObject()

//             console.log(user, '가입됫다')
//         }
//         catch(err){
//             console.log(err)
//         }
//     })()
// })



export default auth