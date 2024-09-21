import { Router } from "express";
import {
  addNewBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "./blogs..js";

const blogRoutes = Router();

blogRoutes.post("/", addNewBlog);
blogRoutes.put("/:id", updateBlog);
blogRoutes.delete("/:id", deleteBlog);
blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getSingleBlog);

export default blogRoutes;