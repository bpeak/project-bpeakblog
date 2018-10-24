import { Request, Response } from 'express'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const getAllpostsCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{

        const postsQueryOptions = {
            filter : { isPublished : true },
            populate : { path : 'author', select : '-_id nick profileImgSrc' },
            sort : { createdDate : -1 },
        }
    
        const posts = await Post
        .find(postsQueryOptions.filter)
        .sort(postsQueryOptions.sort)
        .populate(postsQueryOptions.populate)

        const commentsQueryOptions = {
            populate : { path : 'memberAuthor', select : '-_id nick profileImgSrc unique_id' }
        }

        const comments = await Comment
        .find()
        .populate(commentsQueryOptions.populate)

        const repliesQueryOptions = {
            populate : { path : 'memberAuthor', select : '-_id nick profileImgSrc unique_id' }
        }

        const replies = await Reply
        .find()
        .populate(repliesQueryOptions.populate)

        return res.status(200).json(JSON.stringify({
            posts,
            comments,
            replies
        }))

    }
    catch(err){
        console.log(err)
        return res.status(500).json(JSON.stringify({}))
    }
}

export default getAllpostsCtrl