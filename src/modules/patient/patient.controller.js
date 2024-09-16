import { port } from "../../../app.js";
import { patientModel } from "../../../DB/models/patient.model.js";
import { sendEmailService } from "../../services/sendEmailServecies.js";
import { patientEmailTemp } from "../../units/patientEmail.template.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    res.status(401).json({ messgae: "email or password invalid" });
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
  console.log(token);
  res.status(200).json({ message: "login successfull", token: token });
};

const forgetPassword = (req, res) => {};

const resetPassword = (req, res) => {};

export { signup, verifyEmail, signin, forgetPassword, resetPassword };
