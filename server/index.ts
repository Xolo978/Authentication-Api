import Fastify from "fastify";
const fastify = Fastify({
    logger:true
})
const start = (port:number) =>{
    fastify.listen({port:port},(err,address)=>{
        if(err){
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`Server started on port {port}`)
    })
}
start(3000)
