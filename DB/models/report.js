import mongoose from "mongoose";

let reportSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Appointment",
    },
    patientName: {
      // type: mongoose.Schema.ObjectId,
      // ref: "Patient"
      type:String
    },
    doctorName: {
      // type: mongoose.Schema.ObjectId,
      // ref: "Doctor"
      type:String
    },
    diagnosis: {
      type: String,
    },
    doctorComment: {
      type: String,
    },
    treatmentPrescription: {
      type: String,
    },
    department: {
      // type: mongoose.Schema.ObjectId,
      // ref:"Department"
      type:String
    },
    patientAddress: {
      type: String,
    },
    patientPhoneNumber: {
      type: String,
    },
    followUpRecommendations: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const reportModel = mongoose.model("Report", reportSchema);
