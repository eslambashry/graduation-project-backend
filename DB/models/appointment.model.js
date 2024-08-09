import { model, Schema } from "mongoose";


const appointmentSchema = new Schema({
    appointID: String,
    patientID:{
        type: Schema.Types.ObjectId,
        "ref":"patient",
        require:true
    }, 
    doctorID: {
        type: Schema.Types.ObjectId,
        "ref":"doctor",
        require:true
    }, 
    departID:{ 
        type: Schema.Types.ObjectId,
        "ref":"department",
        require:true
    }, 
    date: Date,
    time: String,
    status: String
},{timestamps:true,versionKey:false})

export const appointmentModel = model("appointment",appointmentSchema)