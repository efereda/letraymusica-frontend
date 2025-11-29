import React from 'react';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <nav className="footer-nav">
          <a href="/">Inicio</a>
          <a href="/textos">Textos</a>
          <a href="/galeria">Galería</a>
          <a href="/contacto">Contacto</a>
        </nav>
        <p>© {new Date().getFullYear()} Letra y Música — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
