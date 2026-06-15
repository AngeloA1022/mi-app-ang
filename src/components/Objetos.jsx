import React from "react";
import { Link } from "react-router-dom";

/* IMÁGENES */
import pocion from "../images/pocion.png";
import ataqueX from "../images/ataque X.png";
import velocidadX from "../images/velocidad X.png";
import colaSkitty from "../images/Cola Skitty.png";
import botonEscape from "../images/boton escape.png";
import humo from "../images/humo ralentizador.png";
import cura from "../images/cura total.png";
import apuratantos from "../images/apuratantos.jpeg";
import shedinja from "../images/Muñeco Shedinja.jpeg";

export default function Objetos() {
  return (
    <section id="objetos" className="objetos">
      <div className="container">
        <h2>Objetos</h2>

        <p>
          Los objetos en Pokémon Unite son herramientas clave que pueden cambiar
          el rumbo de una partida. Se usan para curar, escapar, mejorar stats o
          afectar enemigos.
        </p>

        {/* CAJAS */}
        <div className="bienvenida-boxes">
          <div className="bienvenida-box">
            <h3>Uso Estratégico</h3>
            <p>
              Elegir el objeto correcto puede definir una pelea o salvarte en
              momentos críticos.
            </p>
          </div>

          <div className="bienvenida-box">
            <h3>Tipos</h3>
            <p>
              Hay objetos ofensivos, defensivos y de movilidad que se adaptan a
              cada estilo de juego.
            </p>
          </div>
        </div>

        {/* ================= OBJETOS ================= */}
        <section>
          <h2>Poción</h2>
          <img src={pocion} alt="Poción" className="objeto-img" />
          <p>Recupera puntos de salud del Pokémon.</p>
        </section>

        <section>
          <h2>Ataque X</h2>
          <img src={ataqueX} alt="Ataque X" className="objeto-img" />
          <p>Aumenta ataque, ataque especial y velocidad de ataque.</p>
        </section>

        <section>
          <h2>Velocidad X</h2>
          <img src={velocidadX} alt="Velocidad X" className="objeto-img" />
          <p>Aumenta velocidad y evita ralentizaciones.</p>
        </section>

        <section>
          <h2>Cola Skitty</h2>
          <img src={colaSkitty} alt="Cola Skitty" className="objeto-img" />
          <p>Mejora daño a Pokémon salvajes y los incapacita.</p>
        </section>

        <section>
          <h2>Botón Escape</h2>
          <img src={botonEscape} alt="Botón Escape" className="objeto-img" />
          <p>Permite desplazarte instantáneamente.</p>
        </section>

        <section>
          <h2>Humo Ralentizador</h2>
          <img src={humo} alt="Humo Ralentizador" className="objeto-img" />
          <p>Reduce velocidad y ataque de enemigos.</p>
        </section>

        <section>
          <h2>Cura Total</h2>
          <img src={cura} alt="Cura Total" className="objeto-img" />
          <p>Elimina efectos negativos y da inmunidad temporal.</p>
        </section>

        <section>
          <h2>Apuratantos</h2>
          <img src={apuratantos} alt="Apuratantos" className="objeto-img" />
          <p>Duplica la velocidad de anotación.</p>
        </section>

        <section>
          <h2>Muñeco Shedinja</h2>
          <img src={shedinja} alt="Muñeco Shedinja" className="objeto-img" />
          <p>Te vuelve inmune pero no puedes moverte.</p>
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