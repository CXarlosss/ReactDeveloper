// src/data/index.ts
import { db } from '../config/db';
import colors from 'colors'; // Asegúrate de esta importación

const clearDB = async () => {
    try {
        await db.sync({ force: true });
        console.log(colors.red.bold('Datos eliminados correctamente y tablas recreadas.'));
        process.exit(0);
    } catch (error) {
        console.log(colors.red.bold('Hubo un error al eliminar los datos: ' + (error as Error).message));
        process.exit(1);
    }
};

if (process.argv[2] === '--clear') {
    clearDB();
}