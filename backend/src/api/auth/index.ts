import { Router } from "express"
import * as commonCtrls from './commonCtrls'
import * as localCtrls from './localCtrls'
import * as socialCtrls from './socialCtrls'

const auth : Router = Router()

// common
auth.post('/doubleCheckNick', commonCtrls.doubleCheckNickCtrl)
// local
auth.post('/local/join', localCtrls.joinCtrl)
auth.post('/local/login', localCtrls.loginCtrl)
auth.post('/local/doubleCheckEmail', localCtrls.doubleCheckEmailCtrl)
// social
auth.get('/social/kakao', socialCtrls.kakaoCtrl)
auth.get('/social/kakao/callback', socialCtrls.kakaoCallbackCtrl)
auth.get('/social/naver', socialCtrls.naverCtrl)
auth.get('/social/naver/callback', socialCtrls.naverCallbackCtrl)

// auth.get('/social/google', socialCtrls.googleCtrl)

auth.get('/social/preUser', socialCtrls.getPreUserCtrl)
auth.post('/social/join', socialCtrls.joinCtrl)

export default auth