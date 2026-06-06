import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <section id="inicio" className="inicio">
      <div className="container">
        <h2>Inicio</h2>
        <p>
          Bienvenido a la página de inicio. Aquí encontrarás información clave sobre Pokémon Unite,
          estrategias, personajes recomendados y enlaces útiles para comenzar.
        </p>

        <div className="bienvenida-boxes">
          <div className="bienvenida-box">
            <h3>Guía Rápida</h3>
            <p>
              Aprende los principios básicos del juego, qué roles existen y cómo comenzar con tu
              primer equipo.
            </p>
          </div>

          <div className="bienvenida-box">
            <h3>Consejos</h3>
            <p>
              Usa esta sección para revisar tácticas de equipo, control de mapa y las mejores
              recomendaciones para jugadores nuevos.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link className="nav-btn" to="/contacto">Contactar</Link>
        </div>
      </div>
    </section>
  );
}
