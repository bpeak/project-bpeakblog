import { Request, Response } from 'express'
import VisitorCard from '~db/models/visitorCard'

const deleteVisitorCard = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const visitorCard_id = req.params._id
        const filterOptions = { _id : visitorCard_id }
        const result = await VisitorCard.findOneAndDelete(filterOptions)
        if(!result){ return res.sendStatus(410)}
        
        return res.status(200).json(JSON.stringify({ isSuccess : true }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default deleteVisitorCard