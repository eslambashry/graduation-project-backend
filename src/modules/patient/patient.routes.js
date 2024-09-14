import express from "express";
import {
  forgetPassword,
  resetPassword,
  signin,
  signup,
} from "./patient.controller.js";

const patientRoutes = express.Router();

patientRoutes.post("/signup", signup);
patientRoutes.post("/signin", signin);
patientRoutes.post("/forget", forgetPassword);
patientRoutes.post("/reset/:token", resetPassword);

export default patientRoutes;
