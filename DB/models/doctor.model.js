import { model, Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Image: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    nationalID: {
      type: String,
      required: true,
      unique: true,
      minlength: 14,
      maxlength: 14,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
// Update availableDates to store objects instead of dates
availableDates: [
  {
    date: {
      type: Date,
      // required: true,
    },
    fromTime: {
      type: String,
      // required: true,
    },
    toTime: {
      type: String,
      // required: true,
    }
  }
],
price:{
  type:Number,
  required: true
},
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,11}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    history: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
    },
    statistics: {
      type: Map,
      of: Number,
    },
    role:{
      type:String,
      enum:['doctor'],
      default:'doctor'
    },
    appointments: [
      {
        appointID: {
          type: Schema.Types.ObjectId,
          ref: "Appointment",
        },
        patientID: {
          type: Schema.Types.ObjectId,
          ref: "Patient",
        },
        date: Date,
        time: String,
        report: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const doctorModel = model("Doctor", doctorSchema);
