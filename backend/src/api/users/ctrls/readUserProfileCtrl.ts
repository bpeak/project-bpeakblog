import { Request, Response } from 'express'
import User from '~db/models/user'

const readUserProfile = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { user } = req
        return res.status(200).json(JSON.stringify({
            user : {
                sex : user.sex
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default readUserProfile