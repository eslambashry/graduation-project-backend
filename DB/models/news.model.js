import { model, Schema } from "mongoose";

const newSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        required:true
    },
    
    body:{
        type:String,
        required:true
    }
},{timeseries:true,versionKey:false})


export const newsModel = model('news',newSchema)