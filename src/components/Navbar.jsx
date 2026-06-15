import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
        <li>
          <Link to="/personajes">Personajes</Link>
        </li>
        <li>
          <Link to="/mapas">Mapas</Link>
        </li>
        
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
