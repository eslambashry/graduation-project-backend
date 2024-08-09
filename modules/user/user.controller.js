import { userModel } from "../../DB/models/user.model.js"


export const addUser = async(req,res,next) => {
    const newData = req.body

    const newUser = await userModel.insertMany(newData)
    if(!newUser){
        res.status(404).json({message:"User Didn't add"})
    }
    res.status(201).json({message:"User Added Successfully",newUser})
    
}