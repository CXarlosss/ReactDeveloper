import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/notFound.css";

export const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>¡Uy! La página que buscas no existe o fue movida.</p>
      <Link to="/" className="notfound__link">
        ← Volver al inicio
      </Link>
    </div>
  );
};
