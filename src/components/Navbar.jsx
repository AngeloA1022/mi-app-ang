import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccessibilityButton from "./Accesibilidad"; // Asegúrate de tenerlos en la misma carpeta

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuario = () => {
      const user = localStorage.getItem("usuarioActivo");
      setUsuario(user ? JSON.parse(user) : null);
    };

    cargarUsuario();
    window.addEventListener("loginChange", cargarUsuario);

    return () => {
      window.removeEventListener("loginChange", cargarUsuario);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.dispatchEvent(new Event("loginChange"));
    navigate("/");
  };

  const nombreUsuario =
    usuario?.nombre || usuario?.email?.split("@")[0] || "Usuario";

  return (
    <>
      {/* 🔝 USUARIO + BOTÓN ARRIBA */}
      {usuario && (
        <div className="usuario-header">
          <span>👤 {nombreUsuario}</span>
          <button className="cerrar-sesion" onClick={cerrarSesion}>
            Cerrar
          </button>
        </div>
      )}

      {/* 🔹 NAV */}
      <nav className="main-navbar">
        <ul>
          <li><Link to="/">Bienvenido</Link></li>
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/consejos">Consejos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/personajes">Personajes</Link></li>
          <li><Link to="/mapas">Mapas</Link></li>
          <li><Link to="/objetos">Objetos</Link></li>
          
          {/* Componente integrado orgánicamente */}
          <li className="navbar-accessibility-item">
            <AccessibilityButton />
          </li>

          {!usuario && (
            <>
              <li><Link to="/registro">Registro</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}

          {usuario && (
            <li className="usuario-nav">
              👤 {nombreUsuario}
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}