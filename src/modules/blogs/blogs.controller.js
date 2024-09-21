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
export const getSingleBlog = async (req,res,next) => {
    const {id} = req.params

    const blog = await blogsModel.findById(id)

    if(!blog) res.status(404).json({message:"Didn't Find Blog"})

        res.status(201).json({message:"Done",blog})
}