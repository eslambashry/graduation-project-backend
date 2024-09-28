import express from "express";
import { addReport, getOneReport, getReports } from "./report.controller.js";

const reportRoutes = express.Router();

reportRoutes.post("/create", addReport);
reportRoutes.get("/", getReports);
reportRoutes.get("/:id", getOneReport);
export default reportRoutes;
