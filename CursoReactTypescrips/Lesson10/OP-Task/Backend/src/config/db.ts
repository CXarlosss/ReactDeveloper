// src/config/db.ts
import mongoose from 'mongoose';
import colors from 'colors'; // Asegúrate de que colors está importado
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI || '', {});
        // CAMBIO AQUÍ: Mensaje más descriptivo y con colores
        console.log(colors.green.bold('📦 Base de datos MongoDB Conectada con éxito.'));
        console.log(colors.yellow(`Host: ${con.connection.host}`)); // Opcional: mostrar el host en otra línea con otro color
    } catch (error) {
        console.error(colors.red('❌ Error de conexión a MongoDB:'));
        console.error(colors.red(error instanceof Error ? error.message : String(error))); // Muestra el mensaje de error de forma más limpia
        exit(1);
    }
};