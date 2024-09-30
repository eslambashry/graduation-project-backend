import express from "express";
import { addReport, getAppointmentReports, getOneReport, getReports } from "./report.controller.js";

const reportRoutes = express.Router();

reportRoutes.post("/create", addReport);
reportRoutes.get("/", getReports);
reportRoutes.get("/:id", getOneReport);
reportRoutes.get("/appointment/:id", getAppointmentReports);

export default reportRoutes;
