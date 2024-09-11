import { Schema,model } from "mongoose"
import pkg from 'bcrypt'

const userSchema = new Schema({

    userName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isConfirmed:{
        type:Boolean,
        required:true,
        default:false,
    },
    role:{
        type:String,
        default:'doctor',
        enum:['admin','doctor']
    },
    phoneNumber:{
        type:String,
    },
    address:[{
        type:String,
        required:true,
    }],
    profilePicture:{
        secure_url:String,
        public_id:String,
    },
    gender:{
        type:String,
        default:'not specified',
        enum:['male','female','not specified']
    },
    age:Number,
    token:String,
    forgetCode:String,
},{timestamps:true})

    userSchema.pre('save',function(){
        this.password = pkg.hashSync(this.password, +process.env.SALT_ROUNDS)
    })

export const userModel = model('user', userSchema)

