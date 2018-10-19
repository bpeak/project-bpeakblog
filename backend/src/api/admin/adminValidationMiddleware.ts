import { Request, Response } from 'express'

const adminValidationMiddleware = (req : Request, res : Response, next : any) => {
    const { user } = req
    if(!user.isAdmin) { return res.sendStatus(403) }
    next()
}

export default adminValidationMiddleware