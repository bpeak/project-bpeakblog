import { Request, Response } from 'express'

const adminValidationMiddleware = (req : Request, res : Response, next : any) => {
    const { user } = req
    if(!user.isAdmin){ return res.status(403).json(JSON.stringify({}))} 
    next()
}

export default adminValidationMiddleware