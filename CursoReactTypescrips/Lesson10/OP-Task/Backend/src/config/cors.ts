// src/config/cors.ts
import dotenv from 'dotenv'
dotenv.config()

import { CorsOptions } from "cors";

const whitelist = [process.env.FRONTEND_URL!]; // Ahora sí cargará bien

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Bloqueado por CORS desde:", origin);
      callback(new Error("Error de CORS"));
    }
  },
  credentials: true
};

export default corsOptions;
