// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Rest API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'Documentación de la API de productos',
    },
    tags: [
      {
        name: 'Products',
        description: 'Operaciones relacionadas con productos',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['src/**/*.ts'], // Comentarios Swagger JSDoc irán aquí
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
