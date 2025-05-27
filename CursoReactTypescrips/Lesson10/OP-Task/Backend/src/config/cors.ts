import { CorsOptions } from "cors";

const whitelist = [process.env.FRONTEND_URL!];

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
