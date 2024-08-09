import { model, Schema } from "mongoose";


const doctorSchema = new Schema({
    name: String,
    specialization: String,
    userName: String,
    nationalID: String,
    departID: {
      type: Schema.Types.ObjectId,
      ref:"department",
      require:true
      },  
    appointments: [
      {
        appointID:{
          type: Schema.Types.ObjectId,
          ref:"appointment",
          require:true
        },  
        patientID: {
          type: Schema.Types.ObjectId,
          ref:"patient",
          require:true
        },
        date: Date,
        time: String,
        status: String
      }
    ]
},{timestamps:true,versionKey:false})

export const doctorModel = model("doctor",doctorSchema)
