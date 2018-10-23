import { Request, Response }from 'express'
import Post from '~db/models/post'

const deletePost = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const post_id : number = Number(req.params._id)
        await Post.findOneAndDelete({ _id : post_id })
        return res.status(200).json(JSON.stringify({ isSuccess : true }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default deletePost