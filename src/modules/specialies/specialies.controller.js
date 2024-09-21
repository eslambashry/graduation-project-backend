import { specialiesModel } from "../../../DB/models/specialtise.model.js";

export const createSpecialies = async (req, res, next) => {
  const newData = req.body;

  const specialies = await specialiesModel.insertMany(newData);

  if (!specialies) res.status(400).json({ message: "Faild" });

  res.status(201).json({ message: "Added", specialies });
};

export const getAllSpecialies = async (req, res, next) => {
  const specialies = await specialiesModel.find();

  if (!specialies)
    res.status(404).json({ message: "Didn't Found Any specialies" });

  res.status(201).json({ message: "news:", specialies });
};

export const getSingleSpecialies = async (req, res, next) => {
  const { id } = req.params;

  const speciality = await specialiesModel.findById(id);

  if (!speciality) res.status(404).json({ message: "Didn't Find speciality" });

  res.status(200).json({ message: "Done", speciality });
};
