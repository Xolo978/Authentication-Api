import Fastify from "fastify";
import mongoose, {mongo} from "mongoose"
const fastify = Fastify({
    logger:true
})
const connectDB = async (connector:string) =>{
    try{
        await mongoose.connect(connector);
        console.log("Connected to DB")
    }
    catch(err){
        console.log("Failed to connect to DB")
        console.log(err)
        process.exit(1);

    }
}
const start = async(port:number,connector:string) =>{
    await connectDB(connector)
    fastify.listen({port:port},(err,address)=>{
        if(err){
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`Server started on port {port}`)
    })
}
await start(3000,"mongodb://localhost:27017/")

