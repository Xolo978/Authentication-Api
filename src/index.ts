import Fastify from "fastify";
import mongoose from "mongoose"
const key :string = "mongodb://localhost:2070/XoloDb"
import {RegisterRoute} from "./routes/register";
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
// fastify.register(RegisterRoute)
const start = async (port: number, connector: string) =>{
    await connectDB(connector)
    fastify.listen({port:port},(err)=>{
        if(err){
            fastify.log.error(err)
            return process.exit(1)
        }
        console.log(`Server started on port ${port}`)
    })
}
await start(3000,<string>key)
