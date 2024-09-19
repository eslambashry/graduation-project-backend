import { blogsModel } from "../../../DB/models/blogs.model.js"
import { customAlphabet } from 'nanoid'
import cloudinary from '../../utilities/cloudinaryConfig.js' 
const nanoid = customAlphabet('123456_=!ascbhdtel', 5)


export const addNewBlog = async (req, res) => {
    try {
      const { title, body } = req.body;
      const { file } = req;
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      // Generate a custom ID for Cloudinary folder structure
      const customId = nanoid();
      
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: `Hospital/Blogs/${customId}` // Folder in Cloudinary
      });
  
      // Extract the Cloudinary URL and public ID
      const { secure_url, public_id } = uploadResult;
  
      // Create a new blog entry with the uploaded image URL
      const newBlog = {
        title,
        body,
        Image: {
          secure_url, // Cloudinary image URL
          public_id // Cloudinary image public ID
        }
      };
  
      // Save the blog to the database
      const createdBlog = await blogsModel.create(newBlog);
  
      // Respond with success message and blog details
      res.status(201).json({
        message: 'Blog added successfully',
        createdBlog
      });
    } catch (error) {
      console.error('Error adding blog:', error);
      res.status(500).json({ message: error.message });
    }
};

export const getAllBlogs = async(req,res,next) => {
    const blogs = await blogsModel.find()

    if(!blogs) res.status(404).json({message:"Didn't Found Any Blogs"})

        res.status(201).json(blogs)
}

export const getSingleBlog = async (req,res,next) => {
    const {id} = req.params

    const blog = await blogsModel.findById(id)

    if(!blog) res.status(404).json({message:"Didn't Find Blog"})

        res.status(201).json(blog)
}

export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        // Find the blog by ID
        const blog = await blogsModel.findById(id);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: "Didn't find blog" });
        }

        // Update the blog properties

        if(title){
            blog.title = title;
        }

        if(body){
            blog.body = body;
        }

        // Save the updated blog instance
        const updatedBlog = await blog.save();

        // Send back the updated blog
        res.status(200).json(updatedBlog);
    } catch (error) {
        next(error); // Handle any errors
    }
};