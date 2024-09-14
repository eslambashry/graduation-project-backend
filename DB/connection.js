import mongoose from "mongoose";

// const uri = "mongodb+srv://eslam:eslam@hospital.q8ghh.mongodb.net/?retryWrites=true&w=majority&appName=hospital"
const uri = "mongodb://localhost:27017/backend-graduation-project";
export const connectionDB = mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected Successfully 👋");
  })
  .catch(() => {
    console.log("connected failed");
  });
