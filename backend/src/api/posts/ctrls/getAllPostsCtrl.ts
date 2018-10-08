import { Request, Response } from 'express'
import Post from '~db/models/Post'

const getAllpostsCtrl = (req : Request, res : Response) : void => {
    (async function() : Promise<Response>{
        try{
            const populationOption = { path : 'author', select : '-_id nick profileImgSrc'}
            const conditions = { isPublished : true }
            const sortOption = { createdDate : -1}
            const posts = await Post.find(conditions)
            .sort(sortOption)
            .populate(populationOption)
            return res.status(200).json(JSON.stringify({ posts }))
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default getAllpostsCtrl