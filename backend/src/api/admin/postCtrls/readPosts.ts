import { Request, Response } from 'express'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const readPosts = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const kinds = req.query.kinds

        const postsQueryOptions = {
            filter : {},
            populate : { path : 'author', select : '-_id nick profileImgSrc' },
            sort : { createdDate : -1 },
        }
        switch(kinds){
            case undefined :
                postsQueryOptions.filter = {}
            break
            case 'inWriting' :
                postsQueryOptions.filter = {
                    isPublished : false
                }
            break
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
            replies,
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default readPosts