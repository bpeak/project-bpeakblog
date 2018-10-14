import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'

interface IReply extends mongoose.Document {
    comment_id : number
    isMember : boolean
    isAdmin : boolean
    memberAuthor? : string
    key? : {
        hash : string
        salt : string
    }
    description : string
    createdDate : string
}

const Schema = mongoose.Schema
const replySchema = new Schema({
    comment_id : { type : Number, required : true },
    isMember : { type : Boolean, required : true },
    isAdmin : { type : Boolean, required : true },
    memberAuthor : { type : mongoose.Schema.Types.ObjectId, ref : 'user' },
    key : {
        hash : { type : String },
        salt : { type : String }
    },
    description : { type : String, required : true },
    createdDate : { type : Date, default : Date.now },
})

const Reply = mongoose.model<IReply>('reply', replySchema)
export default Reply
autoIncrement.initialize(mongoose.connection)
replySchema.plugin(autoIncrement.plugin, 'reply')