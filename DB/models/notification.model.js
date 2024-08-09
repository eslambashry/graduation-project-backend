import { model, Schema } from "mongoose";


const notificationSchema = new Schema({
    title: String,
    description: String,
    receivedAt: Date
},{timestamps:true,versionKey:false})

export const notificationModel = model("notification",notificationSchema)