// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

//Importamos el css
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.min.css"
import "./assets/css/styles.css"
import "./assets/css/normalize.css"
import "./assets/css/responsive.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
