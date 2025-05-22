// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'Documentación para la API de productos'
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL base de tu API (debe coincidir con la de server.ts)
                description: 'Servidor de desarrollo local'
            }
        ],
        components: {
            schemas: {
                Product: { // Definición de tu esquema de Product para Swagger
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The Product ID',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'The Product name',
                            example: 'Monitor Curvo de 49 Pulgadas'
                        },
                        price: {
                            type: 'number',
                            description: 'The Product price',
                            example: 300
                        },
                        availability: {
                            type: 'boolean',
                            description: 'The Product availability',
                            example: true
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación',
                            example: '2023-10-26T10:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización',
                            example: '2023-10-26T10:00:00.000Z'
                        }
                    },
                    required: ['name', 'price', 'availability'] // Campos requeridos para crear/actualizar
                }
            }
        }
    },
    apis: ['./src/router.ts'] // Rutas a tus archivos con comentarios JSDoc para Swagger
};

const swaggerSpec = swaggerJsdoc(options);

// Opciones adicionales para Swagger UI (customización de la interfaz)
export const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }', // Ejemplo: Oculta la barra superior de Swagger UI
    customSiteTitle: "Documentación API de Productos" // Título de la pestaña del navegador
};

export default swaggerSpec;