import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import aegislash from '../images/aegislash.png';
import charizard from '../images/charizard.png';
import greninja from '../images/greninja.png';
import decidueye from '../images/decidueye.png';
import blastoise from '../images/blastoise.png';
import goodra from '../images/goodra.png';

/*-- ===========
Comando para crear proyexto en React
npm install
cmd.exe
npm create vite@latest mi-app --template react 
Luego selecionar 
JavaScript + React
Volver a entrar a la pagina
cd nombre-del-proyecto
cmd.exe
npm run dev
========== */

const slides = [
  { image: aegislash, title: 'Aegislash', description: 'Equilibrado y versátil' },
  { image: charizard, title: 'Charizard', description: 'Gran poder equilibrado' },
  { image: greninja, title: 'Greninja', description: 'Ofensivo y ágil' },
  { image: decidueye, title: 'Decidueye', description: 'Arquero y veloz' },
  { image: blastoise, title: 'Blastoise', description: 'Defensivo y poderoso' },
  { image: goodra, title: 'Goodra', description: 'Defensivo y versátil' },
];

export default function Bienvenida() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const autoRef = useRef(null);

  const abrirModal = (id) => {
    alert("Abrir modal: " + id);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const detenerAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };

  const iniciarAuto = () => {
    detenerAuto();
    autoRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    iniciarAuto();
    return () => detenerAuto();
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    detenerAuto();
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }

    iniciarAuto();
  };

  return (
    <div>
      {/* BIENVENIDA */}
      <section id="bienvenida" className="bienvenida">
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
              <Link to="/registro" className="btn-unete">
                Únete a nuestra comunidad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAJES */}
      <section id="personajes" className="destacados">
        <h2>Pokémon Destacados</h2>

        <div
          className="carrusel-container"
          onMouseEnter={detenerAuto}
          onMouseLeave={iniciarAuto}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carrusel-slide"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={slide.title} className={`item ${index === currentIndex ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} />
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            ))}
          </div>

          <button className="prev" onClick={prevSlide}>❮</button>
          <button className="next" onClick={nextSlide}>❯</button>
        </div>
      </section>



<section>
  <div className="enlaces">
    <h2>Navegación</h2>

    <ul>
      <li><Link to="/inicio">Inicio</Link></li>
      <li><Link to="/contacto">Contacto</Link></li>
      <li><Link to="/personajes">Personajes</Link></li>
      <li><Link to="/mapas">Mapas</Link></li>
      <li><Link to="/objetos">Objetos</Link></li>
    </ul>

  </div>
</section>

    </div>
  );
}