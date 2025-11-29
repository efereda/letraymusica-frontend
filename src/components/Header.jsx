// Header.jsx (Actualizado)

import React, { useState } from 'react'; // 1. Importamos useState
import { Link } from 'react-router-dom';

export default function Header() {
  // 2. Añadimos el estado para el menú
  const [menuAbierto, setMenuAbierto] = useState(false);

  // 3. Creamos una función para cerrar el menú (la usaremos en los links)
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* 4. Al hacer click en el logo, también cerramos el menú */}
        <Link to="/" className="brand" onClick={cerrarMenu}>
          Letra y Música
        </Link>

        {/* 5. Este es el nuevo botón de hamburguesa */}
        <button
          className="btn-menu"
          onClick={() => setMenuAbierto(!menuAbierto)} // Alterna el estado
          aria-label="Abrir menú"
        >
          {/* Icono simple de 3 barras */}
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 6. Añadimos la clase 'abierto' al nav si el estado es true */}
        <nav className={`nav-links ${menuAbierto ? 'abierto' : ''}`}>
          {/* 7. Cada link ahora cierra el menú al hacer click */}
          <Link to="/textos" onClick={cerrarMenu}>
            Textos
          </Link>
          <Link to="/galeria" onClick={cerrarMenu}>
            Galería
          </Link>
          <Link to="/textos" onClick={cerrarMenu}>
            Contacto
          </Link>
          {/* <Link to="/admin" className="admin-link" onClick={cerrarMenu}>Admin
           </Link> */}
          </nav>
      </div>
    </header>
  );
}