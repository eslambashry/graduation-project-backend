/*
import { model, Schema } from "mongoose";


const appointmentSchema = new Schema({
    appointID: String,
    patientID:{
        type: Schema.Types.ObjectId,
        ref:"patient",
        require:true
    }, 
    doctorID: {
        type: Schema.Types.ObjectId,
        ref:"doctor",
        require:true
    }, 
    departID:{ 
        type: Schema.Types.ObjectId,
        ref:"department",
        require:true
    }, 
    date: Date,
    time: String,
    status: String
},{timestamps:true,versionKey:false})

export const appointmentModel = model("appointment",appointmentSchema)

*/

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    doctorID: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientID: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    department: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["not completed", "completed","cancelled"],
      default: "not completed",
    },
    report: {
      patientName: { type: String },
      diagnosis: { type: String },
      doctorComment: { type: String },
      treatmentPrescription: { type: String },
      doctorName: { type: String },
      doctorSpecialization: { type: String },
      department: { type: String },
      dateOfExamination: { type: Date },
      timeOfExamination: { type: String },
      patientAddress: { type: String },
      patientPhoneNumber: { type: String },
    },
  },
  { timestamps: true, versionKey: false }
);

export const appointmentModel = model("Appointment", appointmentSchema);

