import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'

interface IPost extends mongoose.Document {
    _id : number,
    author : {
        nick : string,
        profileImgSrc : string | null
    },
    isPublished : boolean,
    category : string,
    coverImgSrc : string | null,
    title : string,
    intro : string,
    tags : string[],
    contentState : any,
    createdDate : string,
    editedDate : string,
    isEdited : boolean,
    views : number,
    comments : number[]
}

const Schema = mongoose.Schema
const postSchema = new Schema({
    author : { type: mongoose.Schema.Types.ObjectId, ref : 'user', required : true },
    isPublished : { type : Boolean, required : true },
    category : { type : String, required : true },
    coverImgSrc : { type : String, default : null },
    title : { type : String, required : true },
    intro : { type : String, required : true },
    tags : { type : Array, required : true },
    contentState : { type : Object },
    createdDate : { type : Date, default : Date.now },
    editedDate : { type : Date, default : Date.now },
    isEdited : { type : Boolean, default : false },
    views : { type : Number, default : 0 },
    comments : [{ type : Number, ref : 'comment' }],
})

const Post = mongoose.model<IPost>('post', postSchema)
export default Post
autoIncrement.initialize(mongoose.connection)
postSchema.plugin(autoIncrement.plugin, 'post')