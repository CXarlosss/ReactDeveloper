import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/timeline">Timeline</Link></li>
      <li><Link to="/people">Gente</Link></li>
      <li><Link to="/messages">Mensajes</Link></li>
    </ul>
  </nav>
);

export default Navbar;
