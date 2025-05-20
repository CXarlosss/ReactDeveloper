import { Product } from './../models/Product.model';
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config();

// Resolver __dirname de forma compatible con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Product],
  dialect: 'postgres',
  logging: false
});

export default db;
