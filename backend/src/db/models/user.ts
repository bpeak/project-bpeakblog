import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    unique_id : string,
    memberType : string,
    isAdmin : boolean,
    nick : string,
    sex : string,
    profileImgSrc? : string,
    joinDate : string,
    key? : {
        hash : string,
        salt : string
    },
    email? : string,
    social_id? : string,
}


const Schema = mongoose.Schema
const userSchema = new Schema({
    // common
    unique_id : { type : String, required : true },
    memberType : { type : String, required : true },
    isAdmin : { type : Boolean, required : true },
    nick : { type : String, required : true },
    sex : { type : String, required : true },
    profileImgSrc : { type : String, default : null },
    joinDate : { type : Date, default : Date.now },
    // local
    key : {
        hash : { type : String },
        salt : { type : String }   
    },
    email : { type : String },
    //social
    social_id : { type : String }
})

const User = mongoose.model<IUser>('user', userSchema)
export default User