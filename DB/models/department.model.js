import { Schema, model } from "mongoose";
// new update
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

export const departmentModel = model("Department", departmentSchema);
