// src/server.ts
import express from 'express';
import productRoutes from './routes/productRoutes'; // Asegúrate de que esta ruta sea correcta y el archivo exista
import cors from 'cors'; // Si usas CORS, añade esto e instala 'cors' si no lo tienes npm i cors @types/cors
import { db } from './config/db'; // Asegúrate de que esta ruta sea correcta y el archivo exista
import colors from 'colors'; // Para logs si lo usas aquí también
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger'; // Asegúrate de que esta ruta sea correcta y el archivo exista

const app = express();

// Conectar a la base de datos
db.authenticate()
    .then(() => db.sync()) // O db.sync({ force: true }) si quieres resetear la DB en cada inicio (¡cuidado en producción!)
    .then(() => console.log(colors.magenta.bold('Base de datos conectada correctamente')))
    .catch(error => {
        console.log(colors.red.bold('Error al conectar la base de datos: ' + error.message));
        process.exit(1); // Salir si la conexión falla
    });

// Middlewares
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(cors()); // Habilita CORS si es necesario

// Rutas de tu API
app.use('/products', productRoutes); // Ejemplo de ruta para productos

// Documentación Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exporta la instancia de la aplicación
export default app;