import mongoose from "mongoose";
import { reportModel } from "../../../DB/models/report.js";

let addReport = async (req, res) => {
  let report = new reportModel(req.body);
  await report.save();

  return res
    .status(200)
    .json({ message: "report created successfully", report });
};

let getReports = async (req, res) => {
  let reports = await reportModel.find();

  res.status(200).json({ message: "reports", reports: reports });
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

export { addReport, getReports, getOneReport };
