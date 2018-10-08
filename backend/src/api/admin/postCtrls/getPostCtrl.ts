import { Request, Response } from 'express'
import Post from '~db/models/post'

const getPostCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response>{
        try{
            const post_id = req.params._id
            const post = await Post.findOne({ _id : post_id }).lean()
            return res.status(200).json(JSON.stringify({ post }))
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}   

export default getPostCtrl