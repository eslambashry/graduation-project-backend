
import { Router } from 'express';
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } from './doctor.controller.js';
import { isAdmin } from '../../middlewares/authorization.js';

const doctorRoutes = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:id', getDoctorById);

doctorRoutes.post('/', createDoctor); 
doctorRoutes.put('/:id', isAdmin, updateDoctor); 
doctorRoutes.delete('/:id', isAdmin, deleteDoctor); 

export default doctorRoutes;
