import { Request, Response } from 'express'
import Post from '~db/models/post'

const readPostsCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const populateOptions = [
            {
                path : 'author'
            },
            {
                path : 'comments',
                populate : {
                    path : 'memberAuthor'
                }
            }
        ]
        const posts = await Post
        .find()
        .populate(populateOptions)

        return res.status(200).json(JSON.stringify({ posts }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default readPostsCtrl