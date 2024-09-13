import { blogsModel } from "../../../DB/models/blogs.model.js"


export const addNewBlog = async (req,res,next) => {

    const blogs = req.body
    
   const newBlog = await blogsModel.insertMany(blogs) 

   if(!newBlog) res.status(400).json({message:"Error When Add Blog"})


    res.status(201).json({message:"added",newBlog})

}


export const getAllBlogs = async(req,res,next) => {
    const blogs = await blogsModel.find()

    if(!blogs) res.status(404).json({message:"Didn't Found Any Blogs"})

        res.status(201).json({message:"blogs",blogs})
}

export const getSingleBlog = async (req,res,next) => {
    const {id} = req.params

    const blog = await blogsModel.findById(id)

    if(!blog) res.status(404).json({message:"Didn't Find Blog"})

        res.status(201).json({message:"Done",blog})
}