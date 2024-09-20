import { Router } from "express";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "./department.controller.js";

const departmentRoutes = Router();

departmentRoutes.post("/create", createDepartment);
departmentRoutes.get("/get-all", getAllDepartments);
departmentRoutes.get("/get-one/:id", getDepartmentById);
departmentRoutes.put("/update/:id", updateDepartment);
departmentRoutes.delete("/delete/:id", deleteDepartment);

export default departmentRoutes;
