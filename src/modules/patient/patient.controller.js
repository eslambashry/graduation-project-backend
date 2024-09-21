import { port } from "../../../app.js";
import { patientModel } from "../../../DB/models/patient.model.js";
import { sendEmailService } from "../../services/sendEmailServecies.js";
import { patientEmailTemp } from "../../units/patientEmail.template.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { resetPasswordTemp } from "../../units/resetPasswordTemplate.js";

// update with admin
const updateAdminPatient = async (req, res) => {};

//
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find(); // Fetch all patients from the database
    res.status(200).json({
      message: "Patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving patients",
      error: error.message,
    });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await patientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting patient",
      error: error.message,
    });
  }
};
// Get Patient By ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({
      message: "Patient retrieved successfully",
      data: patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving patient",
      error: error.message,
    });
  }
};

// SignUp  => Create Patient
const signup = async (req, res) => {
  const { email } = req.body;
  let foundedPatient = await patientModel.findOne({ email: email });
  if (foundedPatient) {
    return res.status(401).json({ message: "already register" });
  }
  let newPatient = new patientModel(req.body);
  newPatient.save();
  // Send Mail
  sendEmailService({
    to: email,
    subject: "Confirm your email",
    message: patientEmailTemp(email, port),
  });
  res.status(201).json({ message: "account created" });
};

// Verify Email
const verifyEmail = (req, res) => {
  let token = req.params.token;
  jwt.verify(token, "shit", async (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "invalid token" });
    }
    let patient = await patientModel.findOne({ email: decoded });
    if (patient.isConfirmed) {
      return res.status(401).json({ message: "this email already verified" });
    }
    await patientModel.findOneAndUpdate(
      { email: decoded },
      { isConfirmed: true }
    );
    return res.status(200).json({ message: "account verified" });
  });
};

// SignIn
const signin = async (req, res) => {
  const { email, password } = req.body;
  let foundedPaitent = await patientModel.findOne({ email: email });
  if (!foundedPaitent) {
    return res.status(404).json({ messsage: "please signup" });
  }
  if (
    !foundedPaitent ||
    !bcrypt.compareSync(password, foundedPaitent.password)
  ) {
    return res.status(401).json({ messgae: "email or password invalid" });
  }
  if (!foundedPaitent.isConfirmed) {
    return res
      .status(401)
      .json({ message: "please verify your account first" });
  }
  let token = jwt.sign(
    { id: foundedPaitent._id, email: foundedPaitent.email },
    "shit"
  );

  res.status(200).json({
    message: "login successfull",
    token: token,
    data: {
      email: foundedPaitent.email,
      name: foundedPaitent.name,
      phone: foundedPaitent.phone,
    },
  });
};

// Forget password
const forgetPassword = async (req, res) => {
  let { email } = req.body;
  let founded = await patientModel.findOne({ email: email });
  if (!founded) {
    return res.status(404).json({ message: "this user is not found" });
  }
  sendEmailService({
    to: email,
    subject: "Reset Password",
    message: resetPasswordTemp(email),
  });
  return res.status(200).json({ message: "message sent successfully" });
};

// Reset password
const resetPassword = (req, res) => {
  let { password } = req.body;
  let { token } = req.params;
  jwt.verify(token, "shit", async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "invalid token" });
    }
    let founded = await patientModel.findOne({ email: decoded });
    founded.password = password;
    founded.save();
  });
  return res.status(200).json({ message: "password updated successfully" });
};

// Update Password
const updatePassword = (req, res) => {
  let { password } = req.body;
  let { token } = req.params;

  jwt.verify(token, "shit", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "you are not authurized" });
    }
    let foundedPatient = await patientModel.findById(decoded.id);
    let identicalPassword = bcrypt.compareSync(
      password,
      foundedPatient.password
    );

    if (identicalPassword) {
      return res.status(403).json({ message: "same old password" });
    }

    foundedPatient.password = password;
    foundedPatient.save();

    return res.status(200).json({
      message: "password updated successfully",
    });
  });
};

// Update Patient
const updatePatient = async (req, res) => {
  const { token } = req.params;
  const { email, name, phone } = req.body;

  jwt.verify(token, "shit", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const foundedPatient = await patientModel.findById(decoded.id);
    if (!foundedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const emailExists = await patientModel.findOne({ email });
    if (
      emailExists &&
      emailExists._id.toString() !== foundedPatient._id.toString() // 7eta say3a de
    ) {
      return res.status(409).json({ message: "This email already exists" });
    }
    foundedPatient.email = email;
    foundedPatient.name = name;
    foundedPatient.phone = phone;
    await foundedPatient.save();

    let token = jwt.sign(
      {
        id: foundedPatient._id,
        email: foundedPatient.email,
      },
      "shit"
    );

    return res.status(200).json({
      message: "Updated successfully",
      token: token,
      data: {
        email: foundedPatient.email,
        name: foundedPatient.name,
        phone: foundedPatient.phone,
      },
    });
  });
};

export {
  signup,
  verifyEmail,
  signin,
  forgetPassword,
  resetPassword,
  updatePassword,
  updatePatient,
  getAllPatients,
  deletePatient,
  getPatientById,
  updateAdminPatient,
};
