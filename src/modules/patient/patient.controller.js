import { patientModel } from "../../../DB/models/patient.model.js";

const signup = async (req, res) => {
  const { email } = req.body;
  let foundedPatient = await patientModel.findOne({ email: email });
  console.log(foundedPatient);
  if (foundedPatient) {
    return res.status(401).json({ message: "already register" });
  }
  let newPatient = new patientModel(req.body);
  newPatient.save();
  res.status(201).json({ message: "patient created" });
};

const signin = (req, res) => {};

const forgetPassword = (req, res) => {};

const resetPassword = (req, res) => {};

export { signup, signin, forgetPassword, resetPasword };
