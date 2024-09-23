import { io } from "../../../app.js";
import { appointmentModel } from "../../../DB/models/appointment.model.js";
import { patientModel } from "../../../DB/models/patient.model.js";

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
    const { doctorID, patientEmail, date, time, department } = req.body;

    // Find the patient by email
    const patient = await patientModel.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new appointment with the patient's ID
    const newAppointment = new appointmentModel({
      doctorID,
      patientID: patient._id, 
      date,
      time,
      department,
      status: 'not completed',
    });

    // Save the appointment
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


export const getAppointmentsByPatientEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the patient by email
    const patient = await patientModel.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find appointments for the patient
    const appointments = await appointmentModel
      .find({ patientID: patient._id })
      .populate('doctorID', 'name specialization')
      .exec();

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const addReportToAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;
    const report = req.body; 
      
    const appointment = await appointmentModel.findById(appointmentID);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: 'Cannot add report to an incomplete appointment' });
    }

    // Add the report to the appointment
    appointment.report = report; // Make sure to set the report field in the model
    await appointment.save();

    res.status(200).json({ message: 'Report added successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate('doctorID', 'name specialization')
      .populate('patientID', 'name')
      .exec();

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;

    const appointment = await appointmentModel.findById(appointmentID);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'cancelled'; 
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
