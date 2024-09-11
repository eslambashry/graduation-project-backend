import { userModel } from "../../../DB/models/user.model.js"
import { sendEmailService } from "../../services/sendEmailServecies.js"
import { emailTemplate } from "../../units/emailTemplate.js"
import {generateToken, verifyToken} from "../../units/tokenFunctions.js"
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) => {
    const { 
        userName,
        email,
        password,
        confirmPassword,
        age,
        gender,
        phoneNumber,
        address,
    } = req.body
    //is email exsisted
    const isExsisted = await userModel.findOne({email})
    if(isExsisted){
        return res.status(400).json({message:"Email exsisted"})
    }
 const token = generateToken({
    payload:{
        email,
    },
    signature: "stitch",
    expiresIn: '1h',
 })
    const confirmationLink = `${req.protocol}://${req.headers.host}/confirm/${token}`
    const isEmailSent = sendEmailService({
        to:email,
        subject:'Confirmation Email',
         message: //`<a href=${confirmationLink}> Click here to confirm </a>`
         emailTemplate({
            link: confirmationLink,
            linkData: 'Click here to confirm',
            subject: 'Confirmation Email',
         })
         ,
    }) 
    if(!isEmailSent){
        return res.status(400).json({message:'fail to sent confirmation email'})
    }
    const user = new userModel({
        userName,
        email,
        password,
        confirmPassword,
        age, 
        gender,
        phoneNumber,
        address,
    })
    const saveUser = await user.save()
    res.status(201).json({message:'done', saveUser})
}
export const confirmEmail = async(req,res,next) => {
    const {token} = req.params

    const decode = verifyToken({
        token,
        signature: "stitch",
    })
    const user = await userModel.findOneAndUpdate(
        {email: decode?.email, isConfirmed:false},
        {isConfirmed: true},
        {new:true},
        )
        if(!user){
            return res.status(400).json({message:'already confirmed'})
        }
            return res.status(200).json({message:'confirmed done, now log in'})
}

import pkg from 'bcrypt'
export const login = async(req,res,next) => {
    const {email,password} = req.body


    const userExsist = await userModel.findOne({email})
    if(!userExsist){
        return res.status(400).json({message: "in correct email"})
    }

    
    const passwordExsist = pkg.compareSync(password,userExsist.password)
    if(!passwordExsist){
        return res.status(400).json({message: "in correct password"})
    }
    const token = jwt.sign(
        {
          email,
          _id: userExsist._id,
          role: userExsist.role, // After Login Make the Site Know what Is His Role (Doctor , Patient) 
        },
        'stitch',
        { expiresIn: '1h' }
      );
     res.status(200).json({message: 'Login Success', userExsist})
}
