
import { Router } from 'express';
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, login, updateDoctor, updateDoctorAvailableDate } from './doctor.controller.js';
import { isAdmin } from '../../middlewares/authorization.js';
import { validateDoctor } from '../../middlewares/doctorValidators.js';

const doctorRoutes = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:id', getDoctorById);

doctorRoutes.post('/',multerCloudFunction(allowedExtensions.Image).single('image'),createDoctor); 
doctorRoutes.put('/:id', validateDoctor, updateDoctor); 
doctorRoutes.put('/A/:id', updateDoctorAvailableDate); 

doctorRoutes.delete('/:id', isAdmin, deleteDoctor); 
doctorRoutes.post("/login",login)

updateDoctorAvailableDate

export default doctorRoutes;