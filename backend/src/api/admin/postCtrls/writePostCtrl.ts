import { Request, Response } from 'express'
import * as fs from 'fs'
import * as redis from 'redis'
import * as path from 'path'
import Post from '~db/models/Post'
const redisClient = redis.createClient()

const writePostCtrl = (req : Request, res : Response) : void => {
    (async function () : Promise<Response> {
        try{
            const author = 123
            const isPublished = req.body.isPublished
            const category = req.body.category
            const title = req.body.title
            const intro = req.body.intro
            const tags = JSON.parse(req.body.tags)
            const post = await new Post({
                author : req.user._id,
                isPublished,
                category,
                title,
                intro,
                tags
            }).save()

            const uploadPath = path.join(global.__rootDir, `/public/postImgs/${post._id}`)
            fs.mkdirSync(uploadPath)
            const coverImgFileUploadPath = path.join(uploadPath + '/cover')
            fs.mkdirSync(coverImgFileUploadPath)

            const coverImgFile = req.file
            let coverImgSrc = null
            if(coverImgFile){
                const timeStamp = Date.now()
                const originalname = coverImgFile.originalname
                const fileName = timeStamp + '-' + originalname
                coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`
                fs.writeFileSync(`${coverImgFileUploadPath}/${fileName}`, coverImgFile.buffer, "binary")
            }
            
            let contentState = JSON.parse(req.body.contentState)
            let { entityMap } = contentState
            const postTempJsonImgs = await getPostTempJsonImgsFromRedis()
            for(let key in entityMap){
                const postImgDataUrl = entityMap[key].data.src
                postTempJsonImgs.forEach((postTempJsonImg : string) => {
                    const postTempImg = JSON.parse(postTempJsonImg)
                    if(postImgDataUrl === postTempImg.dataUrl){
                        const originalname = postTempImg.file.originalname
                        const timeStamp = Date.now()
                        const fileName = timeStamp + '-' + originalname
                        const imgSrc = `/public/postImgs/${post._id}/${fileName}`
                        entityMap[key].data.src = imgSrc
                        fs.writeFileSync(`${uploadPath}/${fileName}`, Buffer.from(postTempImg.file.buffer), "binary")
                    }
                })
            }

            contentState.entityMap = entityMap
            await post.update({ $set : { 
                contentState,
                coverImgSrc
            }})

            redisClient.del('postTempJsonImg')

            return res.status(200).json(JSON.stringify({}))
        }
        catch(err){
            console.log(err)
            return res.status(500).json(JSON.stringify({}))
        }
    })()
}

export default writePostCtrl

function getPostTempJsonImgsFromRedis () : Promise<string[]> {
    return new Promise((resolve, reject) => {
        redisClient.lrange('postTempJsonImgs', 0, -1, (err, arr) => {
            if(err) { return reject(new Error('getPostTempJsonImgsFromRedis : 에러발생'))}
            const postTempJsonImgs = arr
            return resolve(postTempJsonImgs)
        })                
    })
}