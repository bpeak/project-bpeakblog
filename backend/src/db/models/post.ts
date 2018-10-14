import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'

const Schema = mongoose.Schema
const postSchema = new Schema({
    author : { type: mongoose.Schema.Types.ObjectId, ref : 'user', required : true },
    isPublished : { type : Boolean, required : true },
    category : { type : String, required : true },
    coverImgSrc : { type : String },
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

const Post = mongoose.model('post', postSchema)
export default Post
autoIncrement.initialize(mongoose.connection)
postSchema.plugin(autoIncrement.plugin, 'post')