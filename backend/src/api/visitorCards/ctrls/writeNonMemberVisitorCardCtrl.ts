import { Request, Response } from 'express'
import VisitorCard from '~db/models/visitorCard'
import * as visitorCardConfig from '~configs/visitorCard.config.json'
import textValidator from '~modules/textValidator'

const writeNonMemberVisitorCardCtrl = (req : Request, res : Response) : void => {
    (async function () : Promise<any>{
        try{
            const { description , nick } = req.body
            const isBadRequest : boolean = (
                (!description) ||
                (description.constructor !== String) ||
                (!textValidator.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)) ||
        
                (!nick) ||
                (nick.constructor !== String) ||
                (!textValidator.validateBlank(nick)) ||
                (!textValidator.validateMinLength(nick, visitorCardConfig.NICK_CHAR_MIN)) ||
                (!textValidator.validateMaxLength(nick, visitorCardConfig.NICK_CHAR_MAX))
            )
            if(isBadRequest){ return res.status(400).json(JSON.stringify({})) }

            const visitorCard = (await new VisitorCard({
                isMember : false,
                isAdmin : false,
                description,
                nonMemberAuthor : { nick }
            }).save())
            .toObject()

            return res.status(201).json(JSON.stringify({
                visitorCard : {
                    _id : visitorCard._id,
                    isMember : visitorCard.isMember,
                    isAdmin : visitorCard.isAdmin,
                    description : visitorCard.description,
                    nonMemberAuthor : { nick : visitorCard.nonMemberAuthor.nick },
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

export default writeNonMemberVisitorCardCtrl