import { FastifyInstance } from 'fastify';

export const HomeRoute = async (fastify: FastifyInstance) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the API!' };
  });
};
