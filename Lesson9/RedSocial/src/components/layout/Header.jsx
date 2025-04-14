import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";

export const Header = () => (
  <header className="header">
    <h1 className="header__title">
      <Link to="/" aria-label="Ir a la página principal">CHORLYSOCIAL</Link>
    </h1>
  </header>
);

