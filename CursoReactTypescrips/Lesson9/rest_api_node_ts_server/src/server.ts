import express from "express";
import  productsRouter  from "./router";
import db from "./config/db";
//Conectar a base de datos

connectDB(); // <-- AÑADE ESTO

const server = express();
server.use('/', productsRouter);
async function connectDB() {
    try {
      await db.authenticate();
      console.log("Conectado a la base de datos de Postgree con exito");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
    
}
server.use('/', productsRouter);


export default server;

