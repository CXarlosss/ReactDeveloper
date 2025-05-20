import express from "express";
import productsRouter from "./router.js"; // Recuerda la extensión .js si usas type: module
import db from "./config/db.js";
import colors from "colors";

const server = express();

server.use(express.json());

server.use('/', productsRouter);

// Mostrar banner al iniciar el servidor
function showBanner() {
  console.log(colors.rainbow("════════════════════════════════════════════════════"));
  console.log(colors.green.bold("🚀 Servidor Express con TypeScript levantado con éxito"));
  console.log(colors.cyan("📦 Manejando productos desde /products"));
  console.log(colors.rainbow("════════════════════════════════════════════════════"));
}

// Conexión a la base de datos
async function connectDB() {
  console.log(colors.blue("🌀 Conectando a la base de datos PostgreSQL..."));

  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.magenta.bold("✅ Conectado a la base de datos de PostgreSQL con éxito"));
  } catch (error) {
    console.error(colors.red.bold("❌ Error al conectar a la base de datos:"), error);
  }
}

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  showBanner();
  console.log(colors.yellow(`🌐 Escuchando en http://localhost:${PORT}`));
  connectDB();
});
export default server;
