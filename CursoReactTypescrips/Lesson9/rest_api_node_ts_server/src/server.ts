// src/server.ts
import express from 'express';
import 'colors';
import productRoutes from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import cors from 'cors'; // <--- ¡Asegúrate de que esta importación sea 'import cors from 'cors';' si usas TS!

// Configurar la aplicación de express
const server = express();

// Conectar a base de datos
const connectDB = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log( 'Conexión exitosa a la DB'.blue.bold );
    } catch (error) {
        console.log( error );
        console.log( 'Hubo un error al conectar a la DB'.red.bold );
        process.exit( 1 );
    }
};
connectDB();

// Habilitar CORS - ¡AÑADE ESTA LÍNEA AQUÍ!
// Esto debe ir ANTES de cualquier ruta.
server.use(cors());

// Habilitar lectura de datos de formularios (JSON)
server.use( express.json() );

// Rutas
// ¡OJO! Si tu frontend está llamando a 'http://localhost:3000/products'
// y tu backend define la ruta como '/api/products', hay una discrepancia.
// Si tu frontend espera '/products', esta línea debería ser:
// server.use( '/products', productRoutes );
// Si tu frontend está ajustado para '/api/products', entonces está bien como está.
server.use( '/api/products', productRoutes ); // <-- Revisa bien esta ruta con tu frontend

// Docs
server.use( '/docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec, swaggerUiOptions ) );

export default server;