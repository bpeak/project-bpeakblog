import { Request, Response } from 'express'
import * as fs from 'fs'
import * as redis from 'redis'
import * as path from 'path'
import Post from '~db/models/post'

const createPostCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const {
            isPublished,
            category, 
            title, 
            intro, 
        } = req.body
        const tags = JSON.parse(req.body.tags)
        const contentState = JSON.parse(req.body.contentState)
        const { 
            user
        } = req
        const post = await new Post({
            author : user._id,
            isPublished,
            category,
            title,
            intro,
            tags
        }).save()

        // make post img directory
        fs.mkdirSync(path.join(global.__rootDir, `/public/postImgs/${post._id}`))
        fs.mkdirSync(path.join(global.__rootDir, `/public/postImgs/${post._id}/cover`))

        // coverImg
        const coverImgFile = req.file
        const coverImgSrc = !coverImgFile ? null : (function() : string {
            const fileName = Date.now() + '-' + coverImgFile.originalname
            const coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`
            fs.writeFileSync(path.join(global.__rootDir, coverImgSrc), coverImgFile.buffer, "binary")
            return coverImgSrc
        })()
        
        // contentState
        const tempImgFileNames = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'))
        const { entityMap } = contentState

        for(let key in entityMap){
            const tempImgSrc = entityMap[key].data.src
            const pieces = tempImgSrc.split('/')
            const imgFileName = pieces[pieces.length -1]
            
            // is not exist img ?
            if(tempImgFileNames.indexOf(imgFileName) === -1){ return res.sendStatus(410) }

            const imgSrc = `/public/postImgs/${post._id}/${imgFileName}`
            const oldPath = path.join(global.__rootDir, tempImgSrc)
            const newPath = path.join(global.__rootDir, imgSrc)
            fs.renameSync(oldPath, newPath)
            entityMap[key].data.src = imgSrc
        }
        contentState.entityMap = entityMap

        // delete temp imgs
        const remainingTempImgFiles = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'))
        console.log(remainingTempImgFiles, '이거돌면서 지울건데')
        remainingTempImgFiles.forEach((tempImgFileName) => {
            fs.unlinkSync(path.join(global.__rootDir, '/public/temporary/postImgs', tempImgFileName))
        })

        await post.update({ $set : { 
            contentState,
            coverImgSrc
        }})

        return res.status(201).json(JSON.stringify({
            post : { _id : post._id }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(200)
    }
}

export default createPostCtrl