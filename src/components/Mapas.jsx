import React from "react";
import { Link } from "react-router-dom";

/* IMÁGENES */
import mapaRC from "../images/mapa1_RC.jpg";
import mapaCA from "../images/mapa2_CA.png";
import mapaPA from "../images/mapa3_PA.jpeg";
import mapaEM from "../images/mapa4_em.jpg";

export default function Mapas() {
  return (
    <section id="mapas" className="mapas">
      <div className="container">
        <h2>Mapas</h2>

        <p>
          Los mapas en Pokémon UNITE definen el estilo de juego, objetivos y
          estrategias. Cada uno tiene mecánicas únicas que influyen en cómo se
          desarrolla la partida.
        </p>

        {/* CAJAS RESUMEN */}
        <div className="bienvenida-boxes">
          <div className="bienvenida-box">
            <h3>Objetivos</h3>
            <p>
              Cada mapa tiene jefes como Rayquaza, Zapdos o Regis que dan ventaja
              clave al equipo.
            </p>
          </div>

          <div className="bienvenida-box">
            <h3>Estrategia</h3>
            <p>
              Controlar carriles, jungla y tiempos de aparición es fundamental
              para ganar.
            </p>
          </div>
        </div>

        {/* ================= MAPA 1 ================= */}
        <section>
          <h2>Ruinas Celestiales</h2>
          <img src={mapaRC} alt="Ruinas Celestiales" className="mapa-img" />

          <p>
            Es el mapa principal competitivo con tres carriles: superior,
            inferior y jungla.
          </p>

          <ul>
            <li>
              <strong>Ruta Superior:</strong> Regieleki ayuda a romper la base
              rival.
            </li>
            <li>
              <strong>Ruta Inferior:</strong> Regis otorgan mejoras de combate.
            </li>
            <li>
              <strong>Zona Central:</strong> Rayquaza da escudo para anotar.
            </li>
            <li>
              <strong>Jungla:</strong> Accelgor y Escavalier dan buffs.
            </li>
          </ul>
        </section>

        {/* ================= MAPA 2 ================= */}
        <section>
          <h2>Ciudad Álgida</h2>
          <img src={mapaCA} alt="Ciudad Álgida" className="mapa-img" />

          <p>
            Mapa dinámico con hielo y cintas transportadoras que permiten
            movimientos rápidos.
          </p>

          <ul>
            <li>
              <strong>Rutas:</strong> Abomasnow y Beartic dan experiencia rápida.
            </li>
            <li>
              <strong>Centro:</strong> Articuno congela bases enemigas.
            </li>
            <li>
              <strong>Mecánica:</strong> Desplazamiento rápido con hielo.
            </li>
          </ul>
        </section>

        {/* ================= MAPA 3 ================= */}
        <section>
          <h2>Parque Aural</h2>
          <img src={mapaPA} alt="Parque Aural" className="mapa-img" />

          <p>
            Mapa triangular con sistema de anotación cruzada y ritmo rápido.
          </p>

          <ul>
            <li>
              <strong>Movilidad:</strong> Cintas transportadoras rápidas.
            </li>
            <li>
              <strong>Multiplicador:</strong> Bonificación por rachas de puntos.
            </li>
            <li>
              <strong>Centro:</strong> Regigigas otorga gran ventaja.
            </li>
            <li>
              <strong>Jungla:</strong> Araquanid para farm seguro.
            </li>
          </ul>
        </section>

        {/* ================= MAPA 4 ================= */}
        <section>
          <h2>Estadio Maremagno</h2>
          <img src={mapaEM} alt="Estadio Maremagno" className="mapa-img" />

          <p>
            Mapa clásico más pequeño, con combates constantes y ritmo rápido.
          </p>

          <ul>
            <li>
              <strong>Buffs:</strong> Ludicolo y Bouffalant mejoran combate.
            </li>
            <li>
              <strong>Centro:</strong> Zapdos permite anotaciones instantáneas.
            </li>
            <li>
              <strong>Jungla:</strong> Combates frecuentes por experiencia.
            </li>
          </ul>
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