// src/components/Loader.jsx
import React from "react";
import "../styles/loader.css";
export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Cargando...</p>
    </div>
  );
};
