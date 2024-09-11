import { Router } from "express";
import {  confirmEmail, login, register } from "./user.controller.js";

const userRoutes = Router()

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get('/confirm/:token',confirmEmail)

export default userRoutes;