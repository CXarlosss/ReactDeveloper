import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar" aria-label="Navegación principal">
    <ul className="navbar__menu">
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/timeline">Timeline</Link></li>
      <li><Link to="/people">Gente</Link></li>
      <li><Link to="/messages">Mensajes</Link></li>
    </ul>
  </nav>
);

