import { model, Schema } from "mongoose";


const patientSchema = new Schema({
    email: String,
    fullName: String,
    memberships: [
      {
        membershipID: {
        type: Schema.Types.ObjectId,
        ref:'membership',
        require:true
        },
        startDate: Date,
        endDate: Date
      }
    ],
    donations: [
      {
        donationID: {
        type: Schema.Types.ObjectId,
        ref:'donation',
        require:true
        }, 
        amount: Number,
        date: Date
      }
    ]
},{timestamps:true,versionKey:false})

export const patientModel = model("patient",patientSchema)