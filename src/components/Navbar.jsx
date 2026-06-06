import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Bienvenido</Link>
        </li>
        <li>
          <Link to="/inicio">Inicio</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}
