import React from 'react'

export const Footer = () => (
  <footer className="footer">
  <p>© {new Date().getFullYear()} CHORLYSOCIAL - Todos los derechos reservados</p>
  <div className="footer__links">
    <a href="/privacidad">Política de privacidad</a> | <a href="/cookies">Cookies</a>
  </div>
</footer>

  );
  

export default Footer
