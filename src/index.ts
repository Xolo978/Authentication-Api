import Fastify from "fastify";
import mongoose from "mongoose"
const key :string = "mongodb://localhost:2070/XoloDb"
import {RegisterRoute} from "./routes/register.js";
import {LoginRoute} from "./routes/login.js";
const fastify = Fastify({
    logger:false
})
const connectDB = async (connector: string) =>{
    try{
        await mongoose.connect(connector);
        console.log("Connected to DB")
    }
    catch(err){
        console.log("Failed to connect to DB")
        process.exit(1);
    }

}
fastify.register(RegisterRoute)
fastify.register(LoginRoute)
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
