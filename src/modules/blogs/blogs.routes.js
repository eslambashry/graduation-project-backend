import { Router } from "express";
import { addNewBlog, getAllBlogs, getSingleBlog } from "./blogs.controller.js";

const blogRoutes = Router()

blogRoutes.post('/create/blogs',addNewBlog)
blogRoutes.get('/getall/blogs',getAllBlogs)

blogRoutes.get('/getOneBlogs/:id',getSingleBlog)


export default blogRoutes;