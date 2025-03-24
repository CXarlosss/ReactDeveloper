// @ts-nocheck
import React from 'react'
import logo from '../assets/logo.png'; // ✅ Asegúrate de usar la ruta correcta

const Header = () => {
  return (
 <header>
  <div>
    <img src={logo} alt="logo" />
    <h1>Product Store</h1>
  </div>
 </header>
  )
}

export default Header
