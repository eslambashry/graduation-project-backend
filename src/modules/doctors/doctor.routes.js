import { Router } from "express";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDepartmentDoctors,
  getDoctorById,
  getDoctorsWithAppointments,
  login,
  updateDoctor,
  updateDoctorAvailableDate,
} from "./doctor.controller.js";
import { isAdmin } from "../../middlewares/authorization.js";
import { validateDoctor } from "../../middlewares/doctorValidators.js";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctors);
doctorRoutes.get("/:id", getDoctorById);


doctorRoutes.post(
  "/",
  multerCloudFunction(allowedExtensions.Image).single("image"),
  createDoctor
);
doctorRoutes.put(
  "/:id",
  multerCloudFunction(allowedExtensions.Image).single("image"),
  updateDoctor
);
doctorRoutes.put("/A/:id", updateDoctorAvailableDate);

doctorRoutes.delete('/:id', deleteDoctor); 
doctorRoutes.post("/login",login)

doctorRoutes.get("/department/:id", getDepartmentDoctors);

doctorRoutes.get("/appoint", getDoctorsWithAppointments);

export default doctorRoutes;
