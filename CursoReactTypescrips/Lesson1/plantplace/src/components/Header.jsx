import React from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
import '../styles/Header.css'

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <header className="header-bar">
      <div className="container-xl d-flex align-items-center justify-content-between header-inner">

        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img
              src="/img/Logo1.png"
              alt="Logo de PlantPlace"
              className="logo"
            />
          </Link>
        </div>

        {/* Título */}
        <div className="header-title text-center">
          <h1 className="m-0">PlantPlace</h1>
        </div>

        {/* Carrito + Login */}
        <div className="header-cart d-flex align-items-center gap-3">
          <Cart />
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setIsAuthenticated(!isAuthenticated)}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header
