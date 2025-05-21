// src/server.ts
import app from './app';
import db from './config/db';
import colors from 'colors';

function showBanner() {
  console.log(colors.rainbow("════════════════════════════════════════════════════"));
  console.log(colors.green.bold("🚀 Servidor Express con TypeScript levantado con éxito"));
  console.log(colors.cyan("📦 Manejando productos desde /products"));
  console.log(colors.rainbow("════════════════════════════════════════════════════"));
}

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  showBanner();
  console.log(colors.yellow(`🌐 Escuchando en http://localhost:${PORT}`));
  connectDB();
});
