import { FastifySchema } from "fastify";
export const registerSchema : FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'username', 'password'],
        properties: {
            email : {type: 'string', format: 'email'},
            username : {type: 'string', minLength: 3},
            password: {type: 'string', minLength: 6}
        },
        additionalProperties: false
    }
}