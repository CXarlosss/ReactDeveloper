// src/server.ts
import express from 'express';
import 'colors'; // ¡Importante! Esto extiende String.prototype con los colores
import productRoutes from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

// Configurar la aplicación de express
const server = express();

// Conectar a base de datos
const connectDB = async () => {
    try {
        await db.authenticate();
        await db.sync(); // Esto crea las tablas si no existen
        console.log( 'Conexión exitosa a la DB'.blue.bold ); // Ejemplo de uso de colors
    } catch (error) {
        console.log( error );
        console.log( 'Hubo un error al conectar a la DB'.red.bold );
        process.exit( 1 ); // Termina la aplicación si hay un error de conexión
    }
};
connectDB();

// Habilitar lectura de datos de formularios (JSON)
server.use( express.json() );

// Rutas
server.use( '/api/products', productRoutes );

// Docs
server.use( '/docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec, swaggerUiOptions ) );

export default server;