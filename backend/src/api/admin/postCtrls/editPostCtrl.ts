import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import Post from '~db/models/post'
import * as redis from 'redis'
const redisClient = redis.createClient()

const editPostCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const post_id = req.params._id
        const post : any = await Post.findOne({ _id : post_id })
        if(!post) { return  res.status(500).json(JSON.stringify({})) }

        const author = req.user._id
        const isPublished = req.body.isPublished
        const category = req.body.category
        const title = req.body.title
        const intro = req.body.intro
        const tags = JSON.parse(req.body.tags)

        const uploadPath = path.join(global.__rootDir, `/public/postImgs/${post._id}`)
        const coverFileUploadPath = path.join(uploadPath, '/cover')
        const coverImgFile = req.file
        let coverImgSrc
        if(coverImgFile){
            const originalname = coverImgFile.originalname
            const timeStamp = Date.now()
            const fileName = timeStamp + '-' + originalname
            fs.writeFileSync(`${coverFileUploadPath}/${fileName}`, coverImgFile.buffer, "binary")
            coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`
            if(post.coverImgSrc){
                fs.unlinkSync(path.join(global.__rootDir, post.coverImgSrc))
            }
        } else {
            coverImgSrc = null
            if(post.coverImgSrc){
                const isExistCoverImg = JSON.parse(req.body.isExistCoverImg)
                if(isExistCoverImg){
                    coverImgSrc = post.coverImgSrc
                } else {
                    fs.unlinkSync(path.join(global.__rootDir, post.coverImgSrc))
                }
            }
        }

        let contentState = JSON.parse(req.body.contentState)
        let { entityMap } = contentState
        const postTempJsonImgs = await getPostTempJsonImgsFromRedis()

        await post.update({ $set : {
            isEdited : true,
            author,
            isPublished,
            coverImgSrc,
            category,
            title,
            intro,
            tags
        }})
        return res.status(200).json(JSON.stringify({
            isSuccess : true
        }))
    }
    catch(err){
        console.log(err)
        return res.status(500).json(JSON.stringify({}))
    }
}

export default editPostCtrl

function getPostTempJsonImgsFromRedis () : Promise<string[]> {
    return new Promise((resolve, reject) => {
        redisClient.lrange('postTempJsonImgs', 0, -1, (err, arr) => {
            if(err) { return reject(new Error('getPostTempJsonImgsFromRedis : 에러발생'))}
            const postTempJsonImgs = arr
            return resolve(postTempJsonImgs)
        })                
    })
}