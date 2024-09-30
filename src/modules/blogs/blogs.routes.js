import { Router } from "express";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedEtentions.js";

import {
  addNewBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "./blogs.controller.js";

const blogRoutes = Router();

blogRoutes.post("/", multerCloudFunction(allowedExtensions.Image).single('image'),addNewBlog);
blogRoutes.put("/:id",multerCloudFunction(allowedExtensions.Image).single('image'), updateBlog);
blogRoutes.delete("/:id", deleteBlog);
blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getSingleBlog);

export default blogRoutes;
