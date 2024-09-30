import mongoose from "mongoose";
import { blogsModel } from "../../../DB/models/blogs.model.js";

import { customAlphabet } from "nanoid";
import cloudinary from "../../utilities/cloudinaryConfig.js";
const nanoid = customAlphabet("123456_=!ascbhdtel", 5);



// add new blog
const addNewBlog = async (req, res, next) => {
  try {
    // Generate a custom ID
    const customId = nanoid();

    // Upload file to Cloudinary (assuming file is available in the request)
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: `Hospital/Blogs/${customId}`, // Folder structure in Cloudinary
    });

    // Extract the Cloudinary URL and public ID
    const { secure_url, public_id } = uploadResult;

    // Create a new blog object
    const blogData = {
      title: req.body.title,
      body: req.body.body,
      Image: {
        secure_url, // Cloudinary secure URL
        public_id,  // Cloudinary public ID
      },
    };

    // Save the new blog to the database
    let newBlog = new blogsModel(blogData);
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
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
const updateBlog = async (req, res, next) => {
  try {
    let { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "id not valid" });
    }

    // Find existing blog
    let founded = await blogsModel.findById(id);
    if (!founded) {
      return res.status(404).json({ message: "blog not found" });
    }

    // Prepare update data
    const updateData = {
      title: req.body.title,
      body: req.body.body,
    };

    // Check if an image is provided in the request
    if (req.file) { // assuming you're using middleware like multer for file uploads
      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: `Hospital/Blogs/${id}`, // Folder structure in Cloudinary
      });

      // Extract the Cloudinary URL and public ID
      const { secure_url, public_id } = uploadResult;

      // Add image data to updateData
      updateData.Image = {
        secure_url,
        public_id,
      };
    }

    // Update blog
    let updatedBlog = await blogsModel.findByIdAndUpdate(id, updateData, { new: true }); // 'new: true' to return the updated document

    res.status(200).json({ message: "blog updated successfully", updatedBlog });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
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
