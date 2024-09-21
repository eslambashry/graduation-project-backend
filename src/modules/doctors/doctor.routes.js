
import { Router } from 'express';
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, login, updateDoctor } from './doctor.controller.js';
import { isAdmin } from '../../middlewares/authorization.js';
import { validateDoctor } from '../../middlewares/doctorValidators.js';

const doctorRoutes = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:id', getDoctorById);

doctorRoutes.post('/',multerCloudFunction(allowedExtensions.Image).single('image'),validateDoctor,createDoctor); 
doctorRoutes.put('/:id', validateDoctor, updateDoctor); 
doctorRoutes.delete('/:id', isAdmin, deleteDoctor); 
doctorRoutes.post("/login",login)


export default doctorRoutes;