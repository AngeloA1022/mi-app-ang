import React, { useState } from "react";
import { Link } from "react-router-dom"; // CORRECCIÓN: Faltaba importar Link
import blastoise from '../images/blastoise.png';
import charizard from '../images/charizard.png';
import pikachu from '../images/pikachu.png';
import venusaur from '../images/venusaur.png';

export default function Personajes() {

  const [open, setOpen] = useState(null);

  const [indexDef, setIndexDef] = useState(0);
  const [indexAtk, setIndexAtk] = useState(0);
  const [indexEq, setIndexEq] = useState(0);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  // DATA
  const defensivos = [
    {
      id: "blastoise",
      nombre: "Blastoise",
      img: blastoise,
      descripcion: "Gran defensa y control de zona.",
      ataques1: ["Hidrobomba", "Salpicadura"],
      ataques2: ["Surf", "Giro Rápido"],
      set: "Defensivo",
    }
  ];

  const atacantes = [
    {
      id: "charizard",
      nombre: "Charizard",
      img: charizard,
      descripcion: "Alto daño y movilidad.",
      ataques1: ["Lanzallamas", "Puño Fuego"],
      ataques2: ["Envite Ígneo", "Llamarada"],
      set: "Ofensivo",
    },
    {
      id: "pikachu",
      nombre: "Pikachu",
      img: pikachu,
      descripcion: "Ataques eléctricos rápidos.",
      ataques1: ["Impactrueno", "Electrotela"],
      ataques2: ["Rayo", "Trueno"],
      set: "Velocidad",
    }
  ];

  const equilibrados = [
    {
      id: "venusaur",
      nombre: "Venusaur",
      img: venusaur,
      descripcion: "Buen balance entre ataque y resistencia.",
      ataques1: ["Bomba Lodo", "Drenadoras"],
      ataques2: ["Rayo Solar", "Gigadrenado"],
      set: "Especial",
    }
  ];

  // 🔥 CARRUSEL REUTILIZABLE
  const Carousel = ({ data, index, setIndex }) => {

    const next = () => {
      if (index < data.length - 1) setIndex(index + 1);
    };

    const prev = () => {
      if (index > 0) setIndex(index - 1);
    };

    return (
      <div className="carousel">

        {/* 🔥 BOTÓN PREV SOLO SI SE PUEDE */}
        {index > 0 && (
          <button onClick={prev} className="nav-btn prev">⬅</button>
        )}

        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {data.map((poke, i) => (
            <div
              key={poke.id}
              className={`card ${i === index ? "active" : ""}`}
            >
              <h3>{poke.nombre}</h3>

              <img src={poke.img} alt={poke.nombre} className="img"/>

              <div className="buttons">
                <button onClick={() => toggle(poke.id + "-desc")}>Descripción</button>
                <button onClick={() => toggle(poke.id + "-atk1")}>Ataque 1</button>
                <button onClick={() => toggle(poke.id + "-atk2")}>Ataque 2</button>
                <button onClick={() => toggle(poke.id + "-set")}>Set</button>
              </div>

              {open === poke.id + "-desc" && <p>{poke.descripcion}</p>}

              {open === poke.id + "-atk1" && (
                <div>{poke.ataques1.map((atk) => <p key={atk}>{atk}</p>)}</div>
              )}

              {open === poke.id + "-atk2" && (
                <div>{poke.ataques2.map((atk) => <p key={atk}>{atk}</p>)}</div>
              )}

              {open === poke.id + "-set" && (
                <p><strong>{poke.set}</strong></p>
              )}
            </div>
          ))}
        </div>

        {/* 🔥 BOTÓN NEXT SOLO SI SE PUEDE */}
        {index < data.length - 1 && (
          <button onClick={next} className="nav-btn next">➡</button>
        )}

      </div>
    );
  };

  return (
    <section id="personajes">
      <div className="personajes">

        <h1>Personajes</h1>

        <section>
          <h2>🛡️ Defensivos</h2>
          <Carousel data={defensivos} index={indexDef} setIndex={setIndexDef}/>
        </section>

        <section>
          <h2>⚔️ Atacantes</h2>
          <Carousel data={atacantes} index={indexAtk} setIndex={setIndexAtk}/>
        </section>

        <section>
          <h2>⚖️ Equilibrados</h2>
          <Carousel data={equilibrados} index={indexEq} setIndex={setIndexEq}/>
        </section>

        {/* CORRECCIÓN: Los enlaces ahora se renderizan de forma segura dentro del contenedor principal sin romper los cierres */}
        <section>
          {/* ENLACES */}
          <div className="enlaces">
            <h2>Enlaces Útiles</h2>
            <Link to="/">Volver a Inicio</Link>
          </div>
        </section>

      </div>
    </section>
  );
}

