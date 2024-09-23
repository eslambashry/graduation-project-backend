import mongoose from "mongoose";
import { blogsModel } from "../../../DB/models/blogs.model.js";

// add new blog
const addNewBlog = async (req, res, next) => {
  let blog = req.body;
  let newBlog = new blogsModel(blog);
  await newBlog.save();

  res.status(201).json({ message: "blog created ", newBlog });
};

// get all blogs
const getAllBlogs = async (req, res, next) => {
  let blogs = await blogsModel.find();
  if (!blogs) {
    res.status(404).json({ message: "Blogs not found yet" });
  }
  res.status(201).json({ message: "blogs", blogs: blogs });
};

const getSingleBlog = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "id not valid" });
  }

  const blog = await blogsModel.findById(id);
  if (!blog) {
    res.status(404).json({ message: "blog not found" });
  }

  res.status(201).json({ message: "Founded", blog });
};

// update blog
const updateBlog = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "id not valid" });
  }

  let founded = await blogsModel.findById(id);
  if (!founded) {
    return res.status(404).json({ message: "blog not found" });
  }

  let updatedBlog = await blogsModel.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "blog updated successfully" });
};

// delete blogs
const deleteBlog = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "id not valid" });
  }

  let founded = await blogsModel.findById(id);
  if (!founded) {
    return res.status(404).json({ message: "blog not found" });
  }
  let deletedBlog = await blogsModel.findByIdAndDelete(id);

  return res.status(200).json({ message: "blog deleted successfully" });
};

export { updateBlog, deleteBlog, getSingleBlog, addNewBlog, getAllBlogs };
