import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {onHome && (
          <>
            <li>
              <a href="#bienvenida">Bienvenida</a>
            </li>
            <li>
              <a href="#inicio">Inicio página</a>
            </li>
            <li>
              <a href="#consejos">Consejos</a>
            </li>
            <li>
              <a href="#personajes">Personajes</a>
            </li>
            <li>
              <a href="#mapas">Mapas</a>
            </li>
            <li>
              <a href="#objetos">Objetos</a>
            </li>
          </>
        )}
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}
