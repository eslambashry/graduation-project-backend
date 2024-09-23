import { Schema, model } from "mongoose";

// Updated Department Schema
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Department name must be at least 3 characters long"],
    },
    description: {
      type: String,
      trim: true,
    },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Method to get department with populated doctors
departmentSchema.methods.getDoctors = async function () {
  return await this.model('Doctor').find({ department: this._id }).populate('department', 'name');
};

// Create Department Model
export const departmentModel = model("Department", departmentSchema);
