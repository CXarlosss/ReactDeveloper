// src/config/dbForTest.ts
import { Sequelize } from 'sequelize-typescript';
import { Product } from 'models/Product.model';



const dbTest = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [Product], // Aquí se registra el modelo
  logging: false
});

export { dbTest, Product }; // <-- Exporta también el modelo desde aquí, ya está registrado
