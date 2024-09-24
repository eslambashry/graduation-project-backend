import { Schema, model } from "mongoose";
import pkg from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
    phoneNumber: {
      type: String,
    },
    address: [
      {
        type: String,
        required: true,
      },
    ],
    profilePicture: {
      secure_url: String,
      public_id: String,
    },
    gender: {
      type: String,
      default: "not specified",
      enum: ["male", "female", "not specified"],
    },
    age: Number,
    token: String,
    forgetCode: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  this.password = pkg.hashSync(this.password, +process.env.SALT_ROUNDS);
});

export const userModel = model("user", userSchema);
