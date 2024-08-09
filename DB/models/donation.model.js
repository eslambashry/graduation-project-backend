import { model, Schema } from "mongoose";


const donationSchema = new Schema({
    donationID: String,
    amount: Number,
    date: Date,
    fullName: String,
    patientID: {
        type: Schema.Types.ObjectId,
        ref:'patient',
        require:true
    },
    departID: {
        type: Schema.Types.ObjectId,
        ref:'department',
        require:true
    },
    doctorID: {
        type: Schema.Types.ObjectId,
        ref:'doctor',
        require:true
    }
},{timestamps:true,versionKey:false})

export const donationModel = model("donation",donationSchema)