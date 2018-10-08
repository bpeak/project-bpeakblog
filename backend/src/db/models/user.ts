import * as mongoose from 'mongoose'
import * as userConfig from '~configs/user.config.json'
import * as memberTypes from '~constants/memberTypes'

const Schema = mongoose.Schema
const userSchema = new Schema({
    // common
    unique_id : { type : String, required : true },
    memberType : { 
        type : String, 
        required : true,
        validate : {
            validator : (v : string) : boolean => {
                return (
                    v === memberTypes.FACEBOOK || 
                    v === memberTypes.GOOGLE || 
                    v === memberTypes.LOCAL ||
                    v === memberTypes.NAVER ||
                    v === memberTypes.KAKAO
                )
            },
            message : "user schema / memberType 알수없는 유형"
        }
    },
    isAdmin : { type : Boolean, required : true },
    nick : { 
        type : String, 
        required : true,
        validate : {
            validator : (v : String) : boolean => {
                return (v.length <= userConfig.NICK_CHAR_MAX)
            },
            message : `user schema / nick 의 맥스길이 ${userConfig.NICK_CHAR_MAX}`
        }
    },
    sex : {
        type : String,
        required : true,
        validate : {
            validator : (v : string) : boolean => {
                return ( v === 'M' || v === 'W')
            },
            message : "user schema / sex 알수없는 유형"
        }
    },
    profileImgSrc : { type : String, default : null },
    joinDate : { type : Date, default : Date.now },
    // local
    key : {
        hash : { type : String },
        salt : { type : String }   
    },
    email : { 
        type : String,
        validate : {
            validator : (v : string) : boolean => {
                return v.length <= userConfig.EMAIL_CHAR_MAX
            },
            message : `user schema / email 맥스길이 ${userConfig.EMAIL_CHAR_MAX}`
        }
    },
    //social
    social_id : { type : String }
})

const User = mongoose.model('user', userSchema)
export default User