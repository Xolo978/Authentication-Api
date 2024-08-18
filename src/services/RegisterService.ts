import bcrypt from "bcrypt"
import {User} from "../models/User.js"
import {ServiceResponse} from "../types/ServiceResponse";
export const RegisterService = async (email:string,username:string,password:string) : Promise<ServiceResponse> =>{
    try{
        const existingUserEmail = await User.findOne({email:email})
        if(existingUserEmail){
            return {success:false, message: "User with the email exists", code: 400}
        }
        const existingUserUsername = await User.findOne({username:username})
        if(existingUserUsername){
            return {success:false, message: "User with the username exists", code: 400}
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({email:email,username:username,password:hashedPassword})
        await user.save();
        return {success:true, message: "User created", code: 201}
    }
    catch (err){
        console.log(err)
        return {success:false, message: "Server side error", code: 500}

    }
}
