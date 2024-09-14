import { patientModel } from "../../../DB/models/patient.model.js";
import bcrypt from "bcrypt";

//SignUp Create Patient
const signup = async (req, res) => {
  const { email } = req.body;
  let foundedPatient = await patientModel.findOne({ email: email });
  if (foundedPatient) {
    return res.status(401).json({ message: "already register" });
  }
  let newPatient = new patientModel(req.body);
  newPatient.save();
  res.status(201).json({ message: "patient created" });
};

//SignIn
const signin = async (req, res) => {
  const { email, password } = req.body;
  let foundedPaitent = patientModel.findOne({ email: email });
  console.log(foundedPaitent);
  if (!foundedPaitent) {
    return res.status(404).json({ messsage: "Please Signup" });
  }
  if (foundedPaitent && bcrypt.compareSync(password, foundedPaitent.password)) {
    res.status(200).json({ messgae: "hello patient" });
  }
};

const forgetPassword = (req, res) => {};

const resetPassword = (req, res) => {};

export { signup, signin, forgetPassword, resetPassword };
