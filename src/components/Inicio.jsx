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

        {/* CAJAS */}
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

        <section>
          {/* INTRODUCCIÓN */}
          <h2>Introducción a Pokemon Unite</h2>
          <p>
            Pokemon Unite es un juego de batalla en equipo desarrollado por TiMi Studios y publicado
            por The Pokemon Company. En este juego, los jugadores forman equipos de cinco para competir
            en batallas estratégicas en tiempo real. El objetivo es derrotar a los oponentes y anotar
            puntos al capturar objetivos en el mapa.
          </p>
        </section>

        <section>
          {/* ROLES */}
          <div className="roles">
            <h2>Roles en Pokémon Unite</h2>
            <div className="roles-grid">
              <div className="rol attacker">Equilibrado</div>
              <div className="rol defender">Atacante</div>
              <div className="rol support">Defensor</div>
            </div>
          </div>
        </section>

        <section>
          {/* CONSEJOS */}
          <div className="tips">
            <h2>Consejos Básicos</h2>
            <p>
              No vayas solo, juega en equipo.
              Prioriza objetivos como Rayquaza.
              No mueras innecesariamente.
              Farmear experiencia es clave.
            </p>
          </div>
        </section>

        {/* ENLACE */}
        <section>
          <div className="enlaces">
            <h2>Navegación</h2>
            <Link to="/">Volver a Inicio</Link>
          </div>
        </section>
      </div>
    </section>
  );
}

