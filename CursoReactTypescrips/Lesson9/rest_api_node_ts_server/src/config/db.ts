// src/config/db.ts
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models/Product.model';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  models: [Product], // 👈 Muy importante: REGISTRAR MODELO AQUÍ
  logging: false,
});

export default db;
