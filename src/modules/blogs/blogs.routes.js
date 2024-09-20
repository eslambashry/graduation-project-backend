import { Router } from "express";
import { addNewBlog, getAllBlogs, getSingleBlog } from "./blogs.controller.js";

const blogRoutes = Router()

blogRoutes.post('/',addNewBlog)
blogRoutes.get('/',getAllBlogs)
blogRoutes.get('/:id',getSingleBlog)


export default blogRoutes;