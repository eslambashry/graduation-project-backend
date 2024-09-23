import { Router } from "express";
//new update
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "./department.controller.js";

const departmentRoutes = Router();

departmentRoutes.post("/create", createDepartment);
departmentRoutes.get("/", getAllDepartments);
departmentRoutes.get("/:id", getDepartmentById);
departmentRoutes.put("/:id", updateDepartment);
departmentRoutes.delete("/:id", deleteDepartment);

export default departmentRoutes;
