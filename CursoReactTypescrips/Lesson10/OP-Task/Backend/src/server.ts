// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();
const app = express();

// Middleware para parsear JSON
app.use(express.json()); 

// Routes
import projectRoutes from './routes/projectRoutes.js'; // <--- Importando tus rutas
app.use('/api/projects', projectRoutes); // <--- Asignando tus rutas a un prefijo

export default app;