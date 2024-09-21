import { Router } from 'express';
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";
import { 
  createDepartment, 
  getAllDepartments, 
  getDepartmentById, 
  updateDepartment, 
  deleteDepartment 
} from './department.controller.js';



departmentRoutes.post('/', multerCloudFunction(allowedExtensions.Image).single('image'),createDepartment);
departmentRoutes.get('/', getAllDepartments);
departmentRoutes.get('/:id', getDepartmentById);
departmentRoutes.put('/:id', updateDepartment);
departmentRoutes.delete('/:id', deleteDepartment);

export default departmentRoutes;
