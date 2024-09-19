import { Router } from "express";
import {
  confirmEmail,
  forgetPassword,
  login,
  register,
  resetPassword,
} from "./user.controller.js";

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/confirm/:token", confirmEmail);
userRoutes.post("/forget", forgetPassword);
userRoutes.post("/reset/:token", resetPassword);
export default userRoutes;
