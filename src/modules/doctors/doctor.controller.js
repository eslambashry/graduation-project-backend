import { doctorModel } from "../../../DB/models/doctor.model.js";
import { customAlphabet } from "nanoid";
import cloudinary from "../../utilities/cloudinaryConfig.js";
const nanoid = customAlphabet("123456_=!ascbhdtel", 5);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { departmentModel } from "../../../DB/models/department.model.js";
import mongoose from "mongoose";

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
      // Fetch the department ObjectId by name
      const department = await departmentModel.findOne({
        name: req.query.department,
      });
      if (department) {
        filters.department = department._id; // Use the ObjectId for filtering
      } else {
        return res.status(404).json({ message: "Department not found" });
      }
    }

    const doctors = await doctorModel
      .find(filters)
      .populate("department", "name");
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve doctors", error: error.message });
  }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel
      .findById(req.params.id)
      .populate("appointments.appointID")
      .populate("appointments.patientID")
      .populate("department");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new doctor
export const createDoctor = async (req, res) => {
  // Extract data from the request body
  try {
    const {
      name,
      specialization,
      userName,
      nationalID,
      department,
      availableDates, // Ensure this is an array
      email,
      phone,
      price,
      password,
      gender,
      dateOfBirth,
      experience,
      history,
    } = req.body;

    const { file } = req;

    // Check if the file is provided
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Validate availableDates format
    let parsedAvailableDates;
    try {
      // Ensure availableDates is parsed as an array if it comes as a string
      parsedAvailableDates =
        typeof availableDates === "string"
          ? JSON.parse(availableDates)
          : availableDates;

      // Optionally validate the structure of each date object
      parsedAvailableDates.forEach((date) => {
        if (!date.date || !date.fromTime || !date.toTime) {
          throw new Error("Invalid date format");
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: "Invalid availableDates format",
        error: error.message,
      });
    }

    // Upload the image to Cloudinary
    const customId = nanoid();
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: `Hospital/Doctor/${customId}`, // Folder structure in Cloudinary
    });

    // Extract the Cloudinary URL and public ID
    const { secure_url, public_id } = uploadResult;

    // Create a new doctor instance with the uploaded image URL
    const newDoctor = new doctorModel({
      name,
      specialization,
      userName,
      nationalID,
      department,
      availableDates: parsedAvailableDates, // Use parsed data
      email,
      phone,
      price,
      password,
      gender,
      dateOfBirth,
      experience,
      history,
      Image: {
        secure_url, // Save Cloudinary image URL
        public_id, // Save Cloudinary image public ID for future reference
      },
    });

    // Save the doctor to the database
    const addedDoctor = await newDoctor.save();

    // Generate a token
    const token = jwt.sign(
      { email: email, id: addedDoctor._id }, // Payload
      "Doctor", // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Respond with success message and doctor details
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the doctor.",
      error: error.message,
    });
  }
};

// Update a doctor by ID

export const updateDoctor = async (req, res) => {
  try {
    let { availableDates, Image } = req.body;

    // Check if availableDates is a string and parse it into an array
    if (typeof availableDates === "string") {
      availableDates = JSON.parse(availableDates);
    }

    // Find the existing doctor record
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if a new image file is uploaded
    if (req.file) {
      // Remove the old image from Cloudinary
      if (doctor.Image && doctor.Image.public_id) {
        await cloudinary.uploader.destroy(doctor.Image.public_id);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctors",
      });

      // Update the Image object with the new Cloudinary image URL and public ID
      Image = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } else {
      // Keep the existing image if no new image was uploaded
      Image = doctor.Image;
    }

    // Perform the update with the parsed availableDates and new image
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, availableDates, Image },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Doctor Updated Successfully", updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctorAvailableDate = async (req, res) => {
  try {
    // Validate that the availableDates array exists and follows the new structure
    const { availableDates } = req.body;

    // console.log(req.body);

    if (!availableDates || !Array.isArray(availableDates)) {
      return res.status(400).json({ message: "Invalid availableDates format" });
    }

    // Ensure that each entry in availableDates has 'date', 'fromTime', and 'toTime'
    const isValid = availableDates.every(
      (dateObj) => dateObj.date && dateObj.fromTime && dateObj.toTime
    );

    if (!isValid) {
      return res.status(400).json({
        message:
          "Each available date must have 'date', 'fromTime', and 'toTime'",
      });
    }

    // Find the doctor by ID and update the availableDates
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      { availableDates: req.body.availableDates },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Doctor Updated Successfully",
      updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating available dates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ^ doctor login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(req.body);

  // Check if the user exists
  const userExsist = await doctorModel.findOne({ email: email });
  if (!userExsist) {
    return res.status(400).json({ message: "Incorrect email" });
  }

  if (userExsist.password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // Generate JWT token after successful login
  const token = jwt.sign(
    { email: userExsist.email, id: userExsist._id, role: userExsist.role }, // Use the correct references
    process.env.JWT_SECRET || "Doctor", // Use environment variable for secret
    { expiresIn: "1h" } // Token expiration time
  );

  // Respond with success message, user details, and token
  res.status(200).json({
    message: "Login Success",
    user: userExsist,
    token,
  });
};

// ! getDoctorsWithAppointments

export const getDoctorsWithAppointments = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).populate({
      path: "appointments.appointID",
      model: "Appointment",
      match: {
        date: { $gte: new Date() },
      },
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors with appointments:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// get department doctors
export const getDepartmentDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    let doctors = await doctorModel
      .find({ department: id })
      .select("name")
      .select("specialization");
    return res
      .status(200)
      .json({ message: "get doctors successfully", doctors: doctors });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
