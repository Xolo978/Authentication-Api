
fastify.get('/home', async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ message: "Test route works!" });
});
