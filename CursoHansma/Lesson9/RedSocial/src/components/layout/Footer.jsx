import React from "react";

export const Footer = () => (
  <footer className="footer">
    <p>
      © {new Date().getFullYear()} <strong>CHORLYSOCIAL</strong> - Todos los derechos reservados
    </p>
    <div className="footer__links">
      <a href="/privacidad">Política de privacidad</a>
      {" | "}
      <a href="/cookies">Cookies</a>
    </div>
  </footer>
);

