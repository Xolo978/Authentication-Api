import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken'; 
import { User } from '../models/User.js';
import { ServiceResponse } from '../types/ServiceResponse.js';
import { VerificationTokenSchema } from '../models/VerificationTokenSchema.js';
const JWT_SECRET = process.env.JWT_SECRET || '%Hb&*j#l>3,mlm'
export const LoginService = async(email: string, password: string): Promise<ServiceResponse> => {
    try {
        const user = await User.findOne({email:email});
        const tempuser = await VerificationTokenSchema.findOne({email:email})
        if(tempuser){
            return {success: false, message: 'User is not verified', code: 401}
        }
        if(!user){
            return {success: false, message: 'Invalid email or password', code: 401};

        }
        const checkMatch = await bcrypt.compare(password, user.password);
        if(!checkMatch){
            return {success: false, message: 'Invalid email or password', code: 401};
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '2 days'});
        return {success: true, token: token, code: 200};

    } catch (error) {
        console.log(error)
        return {success: false, message: 'Internal server error', code: 500};
    }
}