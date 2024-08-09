import { Router } from "express";
import { addUser } from "./user.controller.js";

const userRoutes = Router()

userRoutes.post("/signUp",addUser)


export default userRoutes;