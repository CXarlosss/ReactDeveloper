// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p className="footer-logo">💸 SplitMate</p>
        <p className="footer-text">
          Hecho por Carlos &nbsp;•&nbsp; {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="https://github.com/CXarlosss" target="_blank" rel="noreferrer">GitHub</a>
          <a href="carlosdepet@gmail.com">Contacto</a>
          <a href="#">Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
};
