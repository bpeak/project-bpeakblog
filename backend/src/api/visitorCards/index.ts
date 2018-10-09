import { Router } from "express"
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'

const visitorCards : Router = Router()

visitorCards.get('/', ctrls.getAllVisitorCardsCtrl)
visitorCards.post('/forMember', tokenValidationMiddleware, ctrls.writeMemberVisitorCardCtrl)
visitorCards.post('/forNonMember', ctrls.writeNonMemberVisitorCardCtrl)

export default visitorCards