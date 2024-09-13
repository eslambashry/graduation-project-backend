import { newsModel } from "../../../DB/models/news.model.js"

export const addNewNews = async (req,res,next) => {

    const news = req.body
    
   const newData = await newsModel.insertMany(news) 

   if(!newData) res.status(400).json({message:"Error When Add Blog"})


    res.status(201).json({message:"added",newData})

}

export const getAllNews = async(req,res,next) => {
    const news = await newsModel.find()

    if(!news) res.status(404).json({message:"Didn't Found Any news"})

        res.status(201).json({message:"news:",news})
}

export const getSingleNew = async (req,res,next) => {
    const {id} = req.params

    const news = await newsModel.findById(id)

    if(!news) res.status(404).json({message:"Didn't Find news"})

        res.status(201).json({message:"Done",news})
}