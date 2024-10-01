import { Router } from "express";

import {
  addReportToAppointment,
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentDetails,
  getAppointmentsByPatientEmail,
  getDoctorAppointment,
  updateAppointmentStatus,
} from "./appointment.controller.js";
const appointmentRoutes = Router();

appointmentRoutes.get("/:appointmentID", getAppointmentDetails);

appointmentRoutes.post("/book", bookAppointment);

appointmentRoutes.patch("/:appointmentID/status", updateAppointmentStatus);

appointmentRoutes.patch("/:appointmentID/report", addReportToAppointment);

appointmentRoutes.get("/patient/:email", getAppointmentsByPatientEmail);

appointmentRoutes.delete("/cancel/:appointmentID", cancelAppointment);

appointmentRoutes.get("/", getAllAppointments);

appointmentRoutes.get("/doctor/:token", getDoctorAppointment);




export default appointmentRoutes;
