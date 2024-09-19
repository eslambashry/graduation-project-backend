import express from "express";
import {
  forgetPassword,
  resetPassword,
  signin,
  signup,
  updatePassword,
  updatePatient,
  verifyEmail,
} from "./patient.controller.js";

const patientRoutes = express.Router();

patientRoutes.post("/signup", signup);
patientRoutes.get("/verify/:token", verifyEmail);
patientRoutes.post("/signin", signin);
patientRoutes.post("/forget", forgetPassword);
patientRoutes.post("/reset/:token", resetPassword);
patientRoutes.post("/updatepassword/:token", updatePassword);
patientRoutes.post("/updatePatient/:token", updatePatient);

export default patientRoutes;
