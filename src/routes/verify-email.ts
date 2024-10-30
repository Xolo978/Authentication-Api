import { FastifyInstance } from "fastify/types/instance";
import dotenv from "dotenv";
dotenv.config()
import Jwt from "jsonwebtoken"
import { User } from "../models/User.js";
import { VerificationTokenSchema} from "../models/VerificationTokenSchema.js";
export const VerifyEmailRoute = async (fastify: FastifyInstance) => {
    fastify.get("/verify-email",async(request,reply)=>{
        const query = request.query as { token: string };
        const token = query.token;
        if(!token){
            return reply.status(400).send({success:false,message:"Token is required"});
        }
        try {
            const decode = Jwt.verify(token,process.env.JWT_SECRET) as Jwt.JwtPayload;
            const tempuser = await VerificationTokenSchema.findOne({_id:decode.id});
            const user = await User.findOne({_id:decode.id});
            if(!tempuser){
                return reply.status(400).send({success:false,message:"Invalid token"});
            }
            if(user){
                return reply.status(400).send({success:false,message:"Email already verified"});
            }
            const newUser = new User({email:tempuser.email,username:tempuser.username,password:tempuser.password});
            newUser.save();
            await VerificationTokenSchema.deleteOne({_id:decode.id});
            return reply.code(200).send({success:true,message:"Email verified"});

        } catch (error) {
            console.log(error)
            return reply.code(500).send({success:false,message:"Invalid or expired token"});
            
        }
            
    } )
}