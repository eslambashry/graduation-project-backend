import { io } from "../../../app.js";
import { appointmentModel } from "../../../DB/models/appointment.model.js";

export const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentID } = req.params;
    const appointment = await appointmentModel
      .findById(appointmentID)
      .populate('doctorID', 'name specialization') 
      .populate('patientID', 'name') 
      .exec();

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({
      doctorName: appointment.doctorID.name,
      doctorSpecialization: appointment.doctorID.specialization,
      patientName: appointment.patientID.name,
      appointmentDate: appointment.date,
      appointmentTime: appointment.time,
      department: appointment.department,
      status: appointment.status
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorID, patientID, date, time, department } = req.body;

    const newAppointment = new appointmentModel({
      doctorID,
      patientID,
      date,
      time,
      department,
      status: 'pending' 
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment: savedAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentID } = req.params;
    const { status } = req.body; 
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentID,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    io.emit('appointmentStatusUpdate', {
      patientID: updatedAppointment.patientID,
      status: updatedAppointment.status,
      appointmentID
    });

    res.status(200).json({ message: 'Appointment status updated', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReportToAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;
    const { report } = req.body;

    const appointment = await appointmentModel.findById(appointmentID);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: 'Cannot add report to an incomplete appointment' });
    }

    appointment.report = report;
    await appointment.save();

    res.status(200).json({ message: 'Report added successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


