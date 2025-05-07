// main.tsx o main.ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)


//nvm use --delete-prefix 22.13.0 Para iniciar el proyecto por que da error esta en otro node16 de normal y asi me lo abre con la version de node 22.13.0
//npm run dev
//npm run build
//npm run preview
