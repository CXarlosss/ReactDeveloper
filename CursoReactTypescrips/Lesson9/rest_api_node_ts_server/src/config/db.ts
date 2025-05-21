import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Product } from "../models/Product.model";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Product],
  dialect: 'postgres',
  logging: false,
});

export default db;
