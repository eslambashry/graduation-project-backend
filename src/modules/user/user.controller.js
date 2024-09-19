import { userModel } from "../../../DB/models/user.model.js"
import { sendEmailService } from "../../services/sendEmailServecies.js"
import { emailTemplate } from "../../units/emailTemplate.js"
import {generateToken, verifyToken} from "../../units/tokenFunctions.js"
import jwt from 'jsonwebtoken';


// ^ =============================== Register ============================================
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

// ^ =============================== Confirm Email ============================================
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

// ^ =============================== Login ============================================
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
        'STITCH',
        { expiresIn: '1h' }
      );

     const userUpdated = await userModel.findOneAndUpdate(
        
        {email},
        
        {
            token,
            status: 'online'
        },
        {new: true},
     )
     res.status(200).json({message: 'Login Success', userUpdated})}


// ^ =============================== Forget Password ============================================
import { nanoid } from "nanoid"
export const forgetPassword = async(req,res,next) => {
    const {email} = req.body

    const isExist = await userModel.findOne({email})
    if(!isExist){
        return res.status(400).json({message: "Email not found"})
    }

    const code = nanoid()
    const hashcode = pkg.hashSync(code, 8) // ! process.env.SALT_ROUNDS
    const token = generateToken({
        payload:{
            email,
            sendCode:hashcode,
        },
        signature: 'STITCH', // ! process.env.RESET_TOKEN
        expiresIn: '1h',
    })
    const resetPasswordLink = `${req.protocol}://${req.headers.host}/reset/${token}`
    const isEmailSent = sendEmailService({
        to:email,
        subject: "Reset Password",
        message: emailTemplate({
            link:resetPasswordLink,
            linkData:"Click Here Reset Password",
            subject: "Reset Password",
        }),
    })
    if(!isEmailSent){
        return res.status(400).json({message:"Email not found"})
    }

    const userupdete = await userModel.findOneAndUpdate(
        {email},
        {forgetCode:hashcode},
        {new: true},
    )
    return res.status(200).json({message:"password changed",userupdete})
}


// ^ =============================== Reset Password ============================================
export const resetPassword = async(req,res,next) => {
    const {token} = req.params
    const decoded = verifyToken({token, signature: 'STITCH'}) // ! process.env.RESET_TOKEN
    const user = await userModel.findOne({
        email: decoded?.email,
        fotgetCode: decoded?.sentCode
    })

    if(!user){
        return res.status(400).json({message: "you are alreade reset it , try to login"})
    }

    const {newPassword} = req.body

    user.password = newPassword,
    user.forgetCode = null

    const updatedUser = await user.save()
    res.status(200).json({message: "Done",updatedUser})
}















