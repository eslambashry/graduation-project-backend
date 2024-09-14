import express from "express";
import {
  forgetPassword,
  resetPasword,
  signin,
  signup,
} from "./patient.controller.js";

const patientRoutes = express.Router();

patientRoutes.post("/signup", signup);
patientRoutes.post("/signin", signin);
patientRoutes.post("/forget", forgetPassword);
patientRoutes.post("/reset/:token", resetPasword);

export default patientRoutes;
