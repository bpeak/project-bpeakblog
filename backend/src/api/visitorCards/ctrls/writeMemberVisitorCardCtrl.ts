import { Request , Response } from 'express'
import VisitorCard from '~db/models/visitorCard'
import * as visitorCardConfig from '~configs/visitorCard.config.json'
import textValidator from '~modules/textValidator'

const writeMemberVisitorCardCtrl = (req : Request, res : Response) : void => {
    (async function () : Promise<Response> {
        try{
            const { user } = req
            const { description } = req.body
            const isBadRequest : boolean = (
                (!description) ||
                (description.constructor !== String) ||
                (!textValidator.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX))                
            )
            if(isBadRequest){ return res.sendStatus(400) }

            const visitorCard = (await new VisitorCard({
                isMember : true,
                isAdmin : user.isAdmin,
                description, 
                memberAuthor : user._id
            }).save())
            .toObject()
            
            return res.status(201).json(JSON.stringify({
                visitorCard : {
                    _id : visitorCard._id,
                    isMember : visitorCard.isMember,
                    isAdmin : visitorCard.isAdmin,
                    description : visitorCard.description,
                    memberAuthor : {
                        nick : user.nick,
                        profileImgSrc : user.profileImgSrc
                    },
                    createdDate : visitorCard.createdDate
                }
            }))
        }
        catch(err){
            console.log(err)
            return res.sendStatus(500)
        }
    })()
}

export default writeMemberVisitorCardCtrl