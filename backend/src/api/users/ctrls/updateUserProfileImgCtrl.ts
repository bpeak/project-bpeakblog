import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import User from '~db/models/user'

const updateUserProfileImgCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const { user, file } = req 
        const isBadRequest = !file
        if(isBadRequest){ return res.sendStatus(400) }

        const userUploadSrc = `/public/users/${user.unique_id}`
        const userUploadPath = path.join(global.__rootDir, userUploadSrc)

        // check user folder 
        if(!fs.existsSync(userUploadPath)){
            fs.mkdirSync(userUploadPath)
        } else {
            const files = fs.readdirSync(userUploadPath)    
            files.forEach((file) => {
                fs.unlinkSync(`${userUploadPath}/${file}`)
            })
        }
        
        // save profileImg
        const fileExtName = path.extname(file.originalname)
        const fileName = `${Date.now()}profile${fileExtName}`
        fs.writeFileSync(`${userUploadPath}/${fileName}`, file.buffer, "binary")

        // update User
        const profileImgSrc = `${userUploadSrc}/${fileName}`
        const filterOptions = { _id : user._id }
        const updateOptions = { $set : { profileImgSrc }}
        const updatedUser = await User.findOneAndUpdate(filterOptions, updateOptions, { new : true })
        if(!updatedUser){ return res.sendStatus(500) }
        
        return res.status(200).json(JSON.stringify({ profileImgSrc : updatedUser.profileImgSrc }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default updateUserProfileImgCtrl