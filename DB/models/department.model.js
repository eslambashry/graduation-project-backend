import { model, Schema } from "mongoose";


const departmentSchema = new Schema({
    name: String,
    desc: String
},{timestamps:true,versionKey:false})

export const departmentModel = model("department",departmentSchema)