import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
import {User} from "../models/User.js"
import { VerificationTokenSchema } from "../models/VerificationTokenSchema.js";
import {ServiceResponse} from "../types/ServiceResponse";
import { sendEmail } from "../utils/sendEmail.js";
export const RegisterService = async (email:string,username:string,password:string) : Promise<ServiceResponse> =>{
    try{
        const checkTempUser = await VerificationTokenSchema.findOne({email:email})
        if(checkTempUser){
            return {success:false, message: "User is not verified", code: 400}
        }
        const existingUserEmail = await User.findOne({email:email})
        if(existingUserEmail){
            return {success:false, message: "User with the email exists", code: 400}
        }
        const existingUserUsername = await User.findOne({username:username})
        if(existingUserUsername){
            return {success:false, message: "User with the username exists", code: 400}
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const tempuser = new VerificationTokenSchema({email:email,username:username,password:hashedPassword})
        await tempuser.save()
        const token = Jwt.sign({id:tempuser._id},process.env.JWT_SECRET as string, {expiresIn:"1h"})
        await sendEmail(tempuser,token)
        return {success:true, message: "User created, verify your email", code: 201}
    }
    catch (err){
        console.log(err)
        return {success:false, message: "Server side error", code: 500}

    }
}
