import { Router } from "express";
import { addNewBlog, getAllBlogs, getSingleBlog, updateBlog } from "./blogs.controller.js";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";
const blogRoutes = Router()

blogRoutes.post('/',multerCloudFunction(allowedExtensions.Image).single('image'),addNewBlog)
blogRoutes.get('/',getAllBlogs)
blogRoutes.get('/:id',getSingleBlog)
blogRoutes.put('/update/:id',updateBlog)


export default blogRoutes;