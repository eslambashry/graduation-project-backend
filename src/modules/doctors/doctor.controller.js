import { doctorModel } from "../../../DB/models/doctor.model.js";

// Get all doctors with filtering options
export const getAllDoctors = async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.specialization) {
      filters.specialization = req.query.specialization;
    }
    if (req.query.gender) {
      filters.gender = req.query.gender;
    }
    if (req.query.department) {
      filters.department = req.query.department;
    }
    
    const doctors = await doctorModel.find(filters);
    
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id)
      .populate('appointments.appointID')
      .populate('appointments.patientID')
      .populate('department');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new doctor
export const createDoctor = async (req, res) => {
    try {
      const newDoctor = new doctorModel(req.body);
      const addedDoctor = await newDoctor.save();
      res.status(201).json({message:"Doctor added successfully", addedDoctor});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Update a doctor by ID
export const updateDoctor = async (req, res) => {
    try {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({message:"Doctor Updated Successfully" , updatedDoctor});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findByIdAndDelete(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
