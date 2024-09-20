import { Router } from "express";
import { addNewNews, getAllNews, getSingleNew } from "./news.controller.js";

const newsRoutes = Router()

newsRoutes.post('/',addNewNews)
newsRoutes.get('/',getAllNews)
newsRoutes.get('/:id',getSingleNew)


export default newsRoutes;
