// @ts-nocheck
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <NavLink to="/" className='logo'>
        <img src={logo} alt='Routemate Logo' />
        <span>Routemate</span>
      </NavLink>
      
      <nav className="navigation">
        <NavLink to="/" className='link'>Home</NavLink>
        <NavLink to="/products" className='link'>Products</NavLink>
        <NavLink to="/contact" className='link'>Contact</NavLink>
      </nav>
    </header>
  )
}

export default Header
