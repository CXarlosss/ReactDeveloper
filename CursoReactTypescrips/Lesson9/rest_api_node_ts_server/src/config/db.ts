// src/config/db.ts
import { Sequelize } from 'sequelize-typescript'; // <-- ¡Cambia esta línea!
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL || "postgresql://rest_api_node_typescript_hn5b_user:uu6XzmCpqmqKXK0hr6vP6Wec7mVZr6G6@dpg-d0lltrogjchc73f6v6rg-a.frankfurt-postgres.render.com/rest_api_node_typescript_hn5b?ssl=true", {
    models: [__dirname + '/../models'], // <-- ¡Mantén esta línea!
    dialect: 'postgres', // Es buena práctica especificar el dialecto
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Esto es crucial para conexiones SSL sin certificado en desarrollo
        }
    },
    logging: false // Puedes cambiar a true para ver los logs de SQL
});

export default db;