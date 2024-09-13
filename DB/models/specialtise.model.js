import { model, Schema } from "mongoose";

const specialtiesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    facilities:{
        type:[String],
        required:true
    }
},{timestamps:true,versionKey:false})

export const specialiesModel = model('specialies',specialtiesSchema)