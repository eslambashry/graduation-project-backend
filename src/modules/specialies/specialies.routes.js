import { Router } from "express";
import { createSpecialies, getAllSpecialies, getSingleSpecialies } from "./specialies.controller.js";


const specialiesRoutes = Router()


specialiesRoutes.post('/create/specialies',createSpecialies)
specialiesRoutes.get('/getAll/specialies',getAllSpecialies)
specialiesRoutes.get('/getSingleSpecialies/:id',getSingleSpecialies)


 
export default specialiesRoutes;