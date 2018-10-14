import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'
import * as visitorCardConfig from '~configs/visitorCard.config.json'

const Schema = mongoose.Schema
const visitorCardSchema = new Schema({
    isMember : { type : Boolean, required : true },
    isAdmin : { type : Boolean, required : true },
    memberAuthor : { type : mongoose.Schema.Types.ObjectId, ref : 'user' },
    nonMemberAuthor : {
        nick : { type : String }
    },
    description : { type : String, required : true, },
    createdDate : { type : Date, default : Date.now }
})

const VisitorCard = mongoose.model('visitorCard', visitorCardSchema)
export default VisitorCard