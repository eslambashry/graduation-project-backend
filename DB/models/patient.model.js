import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "is not selected"],
      default: "is not selected",
    },
    phone: {
      type: "String",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    donations: [
      {
        donationID: {
          type: Schema.Types.ObjectId,
          ref: "donation",
          require: true,
        },
        amount: Number,
        date: Date,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

patientSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

export const patientModel = model("Patient", patientSchema);
