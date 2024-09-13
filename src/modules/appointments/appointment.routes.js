import { Router } from 'express';

import {addReportToAppointment, bookAppointment, getAppointmentDetails, updateAppointmentStatus} from './appointment.controller.js'
const appointmentRoutes= Router()

appointmentRoutes.get('/:appointmentID', getAppointmentDetails);

appointmentRoutes.post('/book', bookAppointment);

appointmentRoutes.patch('/:appointmentID/status', updateAppointmentStatus);

appointmentRoutes.patch('/:appointmentID/report', addReportToAppointment);

export default appointmentRoutes;
