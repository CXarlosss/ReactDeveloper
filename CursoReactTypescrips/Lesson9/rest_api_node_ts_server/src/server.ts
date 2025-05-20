import express from "express";
import  productsRouter  from "./router";
import db from "./config/db";
import colors from "colors";
//Conectar a base de datos

connectDB(); // <-- AÑADE ESTO

const server = express();
server.use('/', productsRouter);
async function connectDB() {
  try {
    await db.authenticate();
    console.log(colors.magenta.bold("Conectado a la base de datos de PostgreSQL con éxito"));

    await db.sync({ alter: true }); // 👈 Esta línea crea/actualiza tablas según el modelo
    console.log(colors.green.bold("Modelos sincronizados correctamente"));
    
  } catch (error) {
    console.error(colors.red.bold("Error al conectar o sincronizar con la base de datos:"));
    console.error(error);
  }
}

server.use('/', productsRouter);


export default server;

