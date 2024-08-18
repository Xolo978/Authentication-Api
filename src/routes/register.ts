import { FastifyInstance } from "fastify";
import { RegisterService } from "../services/RegisterService.js";
import { ResponseBody } from "../types/Body";
import { registerSchema } from "../models/RegisterSchema.js";
export const RegisterRoute = async (fastify: FastifyInstance) => {
  fastify.post("/register",{schema: registerSchema}, async (request, reply) => {
    try {
      const { email, username, password } = request.body as ResponseBody;
      const response = await RegisterService(email, username as string, password);
      return reply.code(response.code).send({ message: response.message, success: response.success });
    } catch (error) {
        console.log(error);
        return reply.code(500).send({ success: false, message: "Server side error" });
    }
  });
};
