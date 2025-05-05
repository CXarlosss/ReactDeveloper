// @ts-nocheck
// main.jsx o index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)


//nvm use --delete-prefix 22.13.0 Para iniciar el proyecto por que da error esta en otro node16 de normal y asi me lo abre con la version de node 22.13.0
//npm run dev
//npm run build
//npm run preview
