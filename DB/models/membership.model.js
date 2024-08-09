import { model, Schema } from "mongoose";


const membershipSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require:true
    }, 
    startDate: Date,
    endDate: Date
},{timestamps:true,versionKey:false})

export const membershipModel = model("membership",membershipSchema)