import { Request, Response } from 'express'
import Post from '~db/models/Post'

const viewUpPost = (req : Request, res : Response) => {
    (async function() : Promise<Response>{
        try{
            const _id = req.params._id
            const conditions = { _id }
            const post : any = await Post.findOne(conditions)
            if(!post) {
                return res.json(410).json(JSON.stringify({}))
            }
            post.views += 1
            await post.save()
            return res.json(204)
        }
        catch(err){
            console.log(err)
            return res.json(500).json(JSON.stringify({}))
        }
    })()
}

export default viewUpPost