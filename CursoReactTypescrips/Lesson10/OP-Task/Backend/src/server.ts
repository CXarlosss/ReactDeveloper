import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import cors from 'cors'
import morgan from 'morgan'
import corsConfig from './config/cors'

import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'


connectDB()

const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datos de formularios
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app