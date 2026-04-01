import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevLog API',
      version: '1.0.0',
      description: 'A REST API for developer daily logs - track wins, knowledge, and code snippets. Built with Express 5, PostgreSQL, Drizzle ORM, and JWT authentication.',
      contact: {
        name: 'API Support',
        url: 'https://github.com/edgarciavfx/devlog-api',
      },
      license: {
        name: 'MIT',
        url: 'https://github.com/edgarciavfx/devlog-api/blob/main/LICENSE',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Log: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            title: { type: 'string', maxLength: 255 },
            content: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        LogInput: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: { type: 'string', maxLength: 255, example: 'Fixed production bug' },
            content: { type: 'string', example: 'Fixed a memory leak in the user service...' },
            tags: { type: 'array', items: { type: 'string' }, example: ['win', 'bugfix'] },
          },
        },
        LogUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', maxLength: 255 },
            content: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                details: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

export const specs = swaggerJsdoc(options);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(specs);