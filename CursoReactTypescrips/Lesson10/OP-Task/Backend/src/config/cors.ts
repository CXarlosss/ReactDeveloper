// cors.ts
import { CorsOptions } from 'cors';

const whitelist = [process.env.FRONTEND_URL];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export default corsOptions;
