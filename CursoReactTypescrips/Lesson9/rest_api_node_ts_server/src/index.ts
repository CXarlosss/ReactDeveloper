// src/index.ts
import server from './server';
import 'colors'; // Asegúrate de que colors esté importado aquí también si no lo está ya en server.ts

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`REST API en el puerto: ${port}`.cyan.bold); // Ejemplo de uso de colors
});