import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: String,
    password:String,
    phone: String,
    email: String,
    isSubscribed: {
      type:Boolean,
      default:false
    },
    notifications: [
      {
        title: String,
        description: String,
        receivedAt: Date,
      }
    ],
    role:{
      type:String,
      enum:['admin','pationt','crew'],
      default:"pationt"
    }
},{timestamps:true,versionKey:false})

export const userModel = model("user",userSchema)