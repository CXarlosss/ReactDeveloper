import React from "react";
import { Link } from "react-router-dom";
import "../styles/pageNotFound.css"; // opcional, si quieres estilizarlo

export const PageNotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Ups, esta página no existe. 😥</p>
      <Link to="/" className="go-home">Volver al inicio</Link>
    </div>
  );
};
