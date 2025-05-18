const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});