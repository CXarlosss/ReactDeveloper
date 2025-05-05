import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <div className="container-xl d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start gap-3">

        {/* Nombre */}
        <div>
          <h4 className="m-0 fw-bold">PlantPlace</h4>
          <p className="mb-0 small">Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </div>

        {/* Enlaces rápidos (opcional) */}
        <div className="d-flex flex-column flex-md-row gap-2">
          <Link to="/" className="footer-link">Inicio</Link>
          <Link to="/cart" className="footer-link">Carrito</Link>
          <a href="mailto:info@plantplace.com" className="footer-link">Contacto</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
