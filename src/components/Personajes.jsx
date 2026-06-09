import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import blastoise from "../images/blastoise.png";
import charizard from "../images/charizard.png";
import pikachu from "../images/pikachu.png";
import venusaur from "../images/venusaur.png";

export default function Personajes() {
  const [open, setOpen] = useState(null);

  const [indexDef, setIndexDef] = useState(0);
  const [indexAtk, setIndexAtk] = useState(0);
  const [indexEq, setIndexEq] = useState(0);

  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem("pokemones");

    if (datos && JSON.parse(datos).length > 0) {
      setPokemones(JSON.parse(datos));
    } else {
      const precargados = [
        {
          id: "blastoise",
          nombre: "Blastoise",
          img: blastoise,
          descripcion: "Gran defensa y control de zona.",
          ataques1: ["Hidrobomba", "Salpicadura"],
          ataques2: ["Surf", "Giro Rápido"],
          set: "Defensivo",
          categoria: "defensivo",
        },
        {
          id: "charizard",
          nombre: "Charizard",
          img: charizard,
          descripcion: "Alto daño y movilidad.",
          ataques1: ["Lanzallamas", "Puño Fuego"],
          ataques2: ["Envite Ígneo", "Llamarada"],
          set: "Ofensivo",
          categoria: "atacante",
        },
        {
          id: "pikachu",
          nombre: "Pikachu",
          img: pikachu,
          descripcion: "Ataques eléctricos rápidos.",
          ataques1: ["Impactrueno", "Electrotela"],
          ataques2: ["Rayo", "Trueno"],
          set: "Velocidad",
          categoria: "atacante",
        },
        {
          id: "venusaur",
          nombre: "Venusaur",
          img: venusaur,
          descripcion: "Buen balance entre ataque y resistencia.",
          ataques1: ["Bomba Lodo", "Drenadoras"],
          ataques2: ["Rayo Solar", "Gigadrenado"],
          set: "Especial",
          categoria: "equilibrado",
        },
      ];
      setPokemones(precargados);
      localStorage.setItem("pokemones", JSON.stringify(precargados));
    }
  }, []);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const defensivos = pokemones.filter((p) => p.categoria === "defensivo");
  const atacantes = pokemones.filter((p) => p.categoria === "atacante");
  const equilibrados = pokemones.filter((p) => p.categoria === "equilibrado");

  const Carousel = ({ data, index, setIndex }) => {
    const next = () => {
      if (index < data.length - 1) setIndex(index + 1);
    };

    const prev = () => {
      if (index > 0) setIndex(index - 1);
    };

    if (data.length === 0) return <p>No hay Pokémon en esta categoría.</p>;

    return (
      <div className="carousel">
        {index > 0 && (
          <button onClick={prev} className="nav-btn prev">⬅</button>
        )}

        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {data.map((poke, i) => (
            <div key={poke.id} className={`card ${i === index ? "active" : ""}`}>
              <h3>{poke.nombre}</h3>
              {poke.img && <img src={poke.img} alt={poke.nombre} className="img" width="150" />}

              <div className="buttons">
                <button onClick={() => toggle(poke.id + "-desc")}>
                  Descripción
                </button>
                <button onClick={() => toggle(poke.id + "-atk1")}>
                  Ataque 1
                </button>
                <button onClick={() => toggle(poke.id + "-atk2")}>
                  Ataque 2
                </button>
                <button onClick={() => toggle(poke.id + "-set")}>
                  Set
                </button>
              </div>

              {open === poke.id + "-desc" && <p>{poke.descripcion}</p>}

              {open === poke.id + "-atk1" && (
                <div>{poke.ataques1?.map((a) => <p key={a}>{a}</p>)}</div>
              )}

              {open === poke.id + "-atk2" && (
                <div>{poke.ataques2?.map((a) => <p key={a}>{a}</p>)}</div>
              )}

              {open === poke.id + "-set" && (
                <p><strong>{poke.set || "Estándar"}</strong></p>
              )}
            </div>
          ))}
        </div>

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
          <Carousel data={defensivos} index={indexDef} setIndex={setIndexDef} />
        </section>

        <section>
          <h2>⚔️ Atacantes</h2>
          <Carousel data={atacantes} index={indexAtk} setIndex={setIndexAtk} />
        </section>

        <section>
          <h2>⚖️ Equilibrados</h2>
          <Carousel data={equilibrados} index={indexEq} setIndex={setIndexEq} />
        </section>

        <section>
          <div className="enlaces">
            <h2>Enlaces</h2>
            <Link to="/">Inicio</Link>
            <br />
            <Link to="/crud">Ir al CRUD</Link>
          </div>
        </section>
      </div>
    </section>
  );
}