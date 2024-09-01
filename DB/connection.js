import mongoose from "mongoose";

export const connectionDB = mongoose.connect('mongodb://localhost:27017/backend-graduation-project')
.then(() => { console.log("DB connected Successfully 👋"); })
.catch(() => { console.log("connected failed") })