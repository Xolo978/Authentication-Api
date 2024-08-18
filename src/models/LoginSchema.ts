import { FastifySchema } from "fastify";
export const loginSchema : FastifySchema = {
    body:{
        type: 'object',
        required: ['email','password'],
        properties:{
            email: {type: 'string', format: 'email'},
            password: {type: 'string', minLength: 6}
        },
        additionalProperties: false
    }
}