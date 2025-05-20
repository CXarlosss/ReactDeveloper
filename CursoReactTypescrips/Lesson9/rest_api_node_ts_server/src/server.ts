import express from "express";
import productsRouter from "./router";
import db from "./config/db";
import colors from "colors";

const server = express();

server.use(express.json()); // <-- ESTA LÍNEA es imprescindible para leer req.body

server.use('/', productsRouter);

async function connectDB() {
  try {
    await db.authenticate();
    await db.sync(); // opcional: sincroniza modelos si aún no existen
    console.log(colors.magenta.bold("Conectado a la base de datos de PostgreSQL con éxito"));
  } catch (error) {
    console.error(colors.red.bold("Error al conectar a la base de datos:"), error);
  }
}

connectDB();

export default server;

