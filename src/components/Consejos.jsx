import React from "react";
import { Link } from "react-router-dom";
import pokemon from "../images/pokemon.jpeg";
import trabajoEquipo from "../images/trabajoen equipo.jpg";
import mapa from "../images/mapa.jpg";

export default function Consejos() {
  return (
    <section id="consejos" className="seccion">
      <div className="container">
        <h1>Consejos para principiantes</h1>

        {/* CONSEJO 1 */}
        <section className="consejo-item">
          <h2>1. Conoce a tus Pokémon</h2>
          <p>
            En Pokémon Unite, cada Pokémon tiene habilidades únicas y roles específicos.
            Es importante conocer las fortalezas y debilidades de cada Pokémon para elegir
            el que mejor se adapte a tu estilo de juego. Algunos Pokémon son excelentes
            para atacar, mientras que otros son mejores para defender o apoyar a tu equipo.
          </p>
          <img
            src={pokemon}
            alt="Pokemon"
            className="consejo-img"
          />
        </section>

        {/* CONSEJO 2 */}
        <section className="consejo-item">
          <h2>2. Trabaja en equipo</h2>
          <p>
            Pokémon Unite es un juego de equipo, por lo que la comunicación y la
            cooperación con tus compañeros son esenciales. Coordina tus movimientos,
            comparte información sobre los enemigos y trabaja juntos para controlar el mapa.
          </p>
          <img
            src={trabajoEquipo}
            alt="Trabaja en equipo"
            className="consejo-img"
          />
        </section>

        {/* CONSEJO 3 */}
        <section className="consejo-item">
          <h2>3. Controla el mapa</h2>
          <p>
            El control del mapa es crucial en Pokémon Unite. Asegúrate de vigilar
            objetivos clave como Regieleki, Rayquaza y otros objetivos importantes,
            ya que pueden darte ventaja sobre el enemigo.
          </p>
          <img
            src={mapa}
            alt="Controla el mapa"
            className="consejo-img"
          />
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