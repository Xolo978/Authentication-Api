import { FastifyInstance } from "fastify";
import { LoginService } from "../services/LoignService.js";
import { loginSchema } from "../models/LoginSchema.js";
import { ResponseBody } from "../types/Body";

export const LoginRoute = async (fastify: FastifyInstance) => {
    fastify.post('/login', {schema: loginSchema}, async (request, reply) => {
        try {
            const {email, password} = request.body as ResponseBody;
            const response = await LoginService(email, password);
            return reply.status(response.code).send(response);

        } catch (error) {
            console.log(error)
            return reply.status(500).send({success: false, message: 'Internal server error'});
        }
    });
}