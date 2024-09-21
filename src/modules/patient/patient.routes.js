import express from "express";
import {
  deletePatient,
  forgetPassword,
  getAllPatients,
  getPatientById,
  resetPassword,
  signin,
  signup,
  updatePassword,
  updatePatient,
  verifyEmail,
} from "./patient.controller.js";

const patientRoutes = express.Router();
patientRoutes.get('/', getAllPatients);
patientRoutes.post("/signup", signup);
patientRoutes.get("/verify/:token", verifyEmail);
patientRoutes.post("/signin", signin);
patientRoutes.post("/forget", forgetPassword);
patientRoutes.post("/reset/:token", resetPassword);
patientRoutes.post("/updatepassword/:token", updatePassword);
patientRoutes.put("/:id", updatePatient);
patientRoutes.delete('/:id', deletePatient);
patientRoutes.get('/:id', getPatientById);
export default patientRoutes;
