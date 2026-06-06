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


      {/* DESTACADOS */}
      <section className="destacados">
        <h2>Pokémon Destacados</h2>

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

      {/* LINK EXTRA COMO TU EJEMPLO */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/contacto">Ir a Contacto</Link>
      </div>

    </div>
  );
}