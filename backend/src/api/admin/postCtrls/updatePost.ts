import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import Post from '~db/models/post'

const updatePost = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const post_id = req.params._id
        const post = await Post.findOne({ _id : post_id })
        if(!post) { return res.sendStatus(410) }

        const author = req.user._id
        const isPublished = JSON.parse(req.body.isPublished)
        const category = req.body.category
        const title = req.body.title
        const intro = req.body.intro
        const tags = JSON.parse(req.body.tags)

        const coverImgFile = req.file
        let coverImgSrc = post.coverImgSrc
        if(post.coverImgSrc){
            // prev coverImgSrc 존재
            if(coverImgFile){
                // 기존커버삭제
                const prevCoverImgSrc = post.coverImgSrc
                fs.unlinkSync(path.join(global.__rootDir, prevCoverImgSrc))
                // 새로운커버추가
                const fileName = Date.now() + '-' + coverImgFile.originalname
                const nextCoverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`
                fs.writeFileSync(path.join(global.__rootDir, nextCoverImgSrc), coverImgFile.buffer, 'binary')
                coverImgSrc = nextCoverImgSrc

            } else {
                const isMaintainingCover = JSON.parse(req.body.isMaintainingCover)
                if(isMaintainingCover){
                    // 기존커버유지 
                    // done
                } else {
                    //기존커버삭제
                    const prevCoverImgSrc = post.coverImgSrc
                    fs.unlinkSync(path.join(global.__rootDir, prevCoverImgSrc))
                    coverImgSrc = null
                }
            }
        } else {
            // prev coverImgSrc 미존재
            if(coverImgFile){
                // 커버추가
                const fileName = Date.now() + '-' + coverImgFile.originalname
                const nextCoverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`
                fs.writeFileSync(path.join(global.__rootDir, nextCoverImgSrc), coverImgFile.buffer, 'binary')
                coverImgSrc = nextCoverImgSrc
            }
        }
        
        const contentState = JSON.parse(req.body.contentState)
        const nextEntityMap = contentState.entityMap
        const prevEntityMap = post.contentState.entityMap

        const tempImgFileNames = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'))

        for(let key in nextEntityMap){
            if(nextEntityMap[key].type === "IMAGE"){
                const entityImgSrc = nextEntityMap[key].data.src
                const pieces = entityImgSrc.split('/')
                const middleFolderName = pieces[2]
                if(middleFolderName === 'public'){
                    // 기존 사용중이던 이미지 => done
                } else if (middleFolderName === 'temporary'){
                    // 새로 추가된 이미지 => 추가
                    const imgFileName = pieces[pieces.length -1]
                    if(tempImgFileNames.indexOf(imgFileName) === -1){ return res.sendStatus(410) }
                    // move imgFile ( temporary foldoer => real foloder )
                    const imgSrc = `/public/postImgs/${post._id}/${imgFileName}`
                    const oldPath = path.join(global.__rootDir, entityImgSrc)
                    const newPath = path.join(global.__rootDir, imgSrc)
                    fs.renameSync(oldPath, newPath)
                    nextEntityMap[key].data.src = imgSrc                    
                }
            }
        }

        const prevImgSrcs : string[] = []
        for(let key in prevEntityMap){
            if(prevEntityMap[key].type === "IMAGE"){
                prevImgSrcs.push(prevEntityMap[key].data.src)
            }
        }

        const nextImgSrcs : string[] = []
        for(let key in nextEntityMap){
            if(nextEntityMap[key].type === "IMAGE"){
                nextImgSrcs.push(nextEntityMap[key].data.src)
            }
        }

        prevImgSrcs.forEach((prevImgSrc) : void => {
            if(nextImgSrcs.indexOf(prevImgSrc) === -1){
                //해당이미지 삭제
                const imgPath = path.join(global.__rootDir, prevImgSrc)
                fs.unlinkSync(imgPath)
            }
        })

        contentState.entityMap = nextEntityMap

        await post.update({ $set : {
            isEdited : true,
            author,
            isPublished,
            coverImgSrc,
            contentState,
            category,
            title,
            intro,
            tags
        }})

        return res.status(200).json(JSON.stringify({ isSuccess : true }))
    }
    catch(err){
        console.log(err)
        return res.status(500).json(JSON.stringify({}))
    }
}

export default updatePost