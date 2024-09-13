import { Router } from "express";
import { addNewNews, getAllNews, getSingleNew } from "./news.controller.js";

const newsRoutes = Router()

newsRoutes.post('/create/news',addNewNews)
newsRoutes.get('/getAllNews',getAllNews)
newsRoutes.get('/getSingleNews/:id',getSingleNew)


export default newsRoutes;
