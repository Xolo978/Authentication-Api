import dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify";
import mongoose from "mongoose"
const key :string = (process.env.MONGO_DB_STRING) as string
import {RegisterRoute} from "./routes/register.js";
import {LoginRoute} from "./routes/login.js";
import { VerifyEmailRoute } from "./routes/verify-email.js";
const fastify = Fastify({
    logger:false
})
const connectDB = async (connector: string) =>{
    const options = {
        dbName:"XoloDb",
    }
    try{
        await mongoose.connect(connector,options);
        console.log("Connected to DB")
    }
    catch(err){
        console.log("Failed to connect to DB")
        process.exit(1);
    }

}
fastify.register(RegisterRoute)
fastify.register(LoginRoute)
fastify.register(VerifyEmailRoute)
const start = async (port: number, connector: string) =>{
    await connectDB(connector)
    fastify.listen({port:port},(err)=>{
        if(err){
            fastify.log.error(err)
            return process.exit(1)
        }
        console.log(`Server listening on ${port}`);
    })
}
await start(3000,<string>key)
