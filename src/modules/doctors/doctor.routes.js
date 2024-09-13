
import { Router } from 'express';
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } from './doctor.controller.js';
import { isAdmin } from '../../middlewares/authorization.js';
import { validateDoctor } from '../../middlewares/doctorValidators.js';

const doctorRoutes = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:id', getDoctorById);

doctorRoutes.post('/', validateDoctor,createDoctor); 
doctorRoutes.put('/:id', validateDoctor, updateDoctor); 
doctorRoutes.delete('/:id', isAdmin, deleteDoctor); 

export default doctorRoutes;
