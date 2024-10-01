import mongoose from "mongoose";
import { reportModel } from "../../../DB/models/report.js";
import { patientModel } from "../../../DB/models/patient.model.js";
import { doctorModel } from "../../../DB/models/doctor.model.js";
import { departmentModel } from "../../../DB/models/department.model.js";
import { io } from "../../../app.js";

let addReport = async (req, res) => {
  try {
    const { patientName, doctorName, department, ...otherData } = req.body;
    
    // Fetch the corresponding documents
    const patient = await patientModel.findOne({ name: patientName });
    const doctor = await doctorModel.findOne({ name: doctorName });
    const dept = await departmentModel.findOne({ name: department });
    
    // Check if patient, doctor, or department exist
    if (!patient || !doctor || !dept) {
      return res.status(400).json({ message: 'Invalid patient, doctor, or department name.' });
    }
    
    // Create a new report instance with ObjectId references
    let report = new reportModel({
      patientName: patientName,  // Use the fetched ObjectId
      doctorName: doctorName,    // Use the fetched ObjectId
      department: department,      // Use the fetched ObjectId
      ...otherData               // Include other data from the request
    });

    // Save the report
    await report.save();
    io.emit("newReport", report);

    return res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

let getReports = async (req, res) => {
  try {
    // Fetch reports and populate doctorName and patientName fields
    let reports = await reportModel
      .find()
      // .populate('patientName', 'name')  // Populate patient name
      // .populate('doctorName', 'name');   // Populate doctor name
      .populate("appointmentId");

    res.status(200).json({ message: "Reports retrieved successfully", reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

let getOneReport = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  let report = await reportModel.findById(id);
  if (!report) {
    return res.status(404).json({ message: "report not found" });
  }

  return res
    .status(200)
    .json({ message: "report found successfully", report: report });
};

let getAppointmentReports = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" });
  }

  let reports = await reportModel
    .find({ appointmentId: id })
    .populate("appointmentId");

  res.status(200).json({ message: "get reports successfully", reports });
};

export { addReport, getReports, getOneReport, getAppointmentReports };
