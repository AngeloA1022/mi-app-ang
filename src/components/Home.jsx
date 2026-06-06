import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import aegislash from '../images/aegislash.png';
import charizard from '../images/charizard.png';
import greninja from '../images/greninja.png';
import decidueye from '../images/decidueye.png';
import blastoise from '../images/blastoise.png';
import goodra from '../images/goodra.png';



export default function Home() {

  const abrirModal = (id) => {
    alert("Abrir modal: " + id);
    // aquí puedes implementar la lógica real
  };

  const prevSlide = () => {
    console.log("Slide anterior");
  };

  const nextSlide = () => {
    console.log("Siguiente slide");
  };

  return (
    <div>

      {/* BIENVENIDA */}
      <section id="bienvenida" className="Bienvenida">
        <div className="container">

          <h2>Bienvenido a la Guía de Pokemon Unite</h2>

          <div className="bienvenida-boxes">

            <div className="bienvenida-box bienvenida-box-info">
              <h3>Tu guía de inicio</h3>
              <p>
                En esta sección encontrarás una introducción al juego, consejos para principiantes 
                y estrategias básicas para comenzar tu aventura en Pokemon Unite.
              </p>
            </div>

            <div className="bienvenida-box bienvenida-box-imagen">
              <img src={logo} alt="Pokemon Unite" />
            </div>

            <div className="bienvenida-box bienvenida-box-boton">
              <button 
                className="btn-unete"
                onClick={() => abrirModal('modalRegistro')}
              >
                Únete a nuestra comunidad
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* INICIO */}
      <section id="inicio" className="inicio">
        <div className="container">
          <h2>Inicio</h2>
          <p>Bienvenido a la sección principal de la guía. Aquí encontrarás información general sobre Pokémon Unite y cómo empezar.</p>
        </div>
      </section>

      {/* CONSEJOS */}
      <section id="consejos" className="consejos">
        <div className="container">
          <h2>Consejos</h2>
          <ul>
            <li>Juega en equipo para controlar las zonas de objetivo.</li>
            <li>Sube de nivel a tus Pokémon rápidamente con golpes a los neutrales.</li>
            <li>Utiliza objetos de apoyo y objetos de movilidad cuando sea necesario.</li>
          </ul>
        </div>
      </section>

      {/* PERSONAJES */}
      <section id="personajes" className="destacados">
        <h2>Personajes</h2>

        <div className="carrusel-container">

          <div className="carrusel-slide" id="slideDest">

            <div className="item">
              <img src={aegislash} alt="Aegislash"/>
              <h3>Aegislash</h3>
              <p>Equilibrado y versátil</p>
            </div>

            <div className="item">
              <img src={charizard} alt="Charizard"/>
              <h3>Charizard</h3>
              <p>Gran poder equilibrado</p>
            </div>

            <div className="item">
              <img src={greninja} alt="Greninja"/>
              <h3>Greninja</h3>
              <p>Ofensivo y ágil</p>
            </div>

            <div className="item">
              <img src={decidueye} alt="Decidueye"/>
              <h3>Decidueye</h3>
              <p>Arquero y veloz</p>
            </div>

            <div className="item">
              <img src={blastoise} alt="Blastoise"/>
              <h3>Blastoise</h3>
              <p>Defensivo y poderoso</p>
            </div>

            <div className="item">
              <img src={goodra} alt="Goodra"/>
              <h3>Goodra</h3>
              <p>Defensivo y versátil</p>
            </div>

          </div>

          {/* BOTONES */}
          <button className="prev" onClick={prevSlide}>❮</button>
          <button className="next" onClick={nextSlide}>❯</button>

        </div>
      </section>

      {/* MAPAS */}
      <section id="mapas" className="mapas">
        <div className="container">
          <h2>Mapas</h2>
          <p>Conoce las zonas del campo de batalla y cómo posicionarte en cada uno de los mapas.</p>
        </div>
      </section>

      {/* OBJETOS */}
      <section id="objetos" className="objetos">
        <div className="container">
          <h2>Objetos</h2>
          <p>Los objetos pueden cambiar la partida. Aprende cuáles usar en cada situación.</p>
        </div>
      </section>

      <div style={{ marginTop: "20px" }}>
        <Link to="/contacto">Ir a Contacto</Link>
      </div>

    </div>
  );
}