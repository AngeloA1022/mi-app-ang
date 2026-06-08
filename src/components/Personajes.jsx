import React, { useState } from "react";
import blastoise from '../images/blastoise.png';
import charizard from '../images/charizard.png';
import pikachu from '../images/pikachu.png';
import venusaur from '../images/venusaur.png';

export default function Personajes() {

  // 🔹 Estados para mostrar info (por Pokémon)
  const [open, setOpen] = useState(null);

  // 🔹 Función para abrir/cerrar secciones
  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  // 🛡️ DEFENSIVOS
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

  // ⚔️ ATACANTES
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

  // ⚖️ EQUILIBRADOS
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

  // 🔹 Función para renderizar cada Pokémon
  const renderPokemon = (poke) => (
    <div key={poke.id} className="card">

      {/* Nombre */}
      <h3>{poke.nombre}</h3>

      {/* Imagen */}
      <img src={poke.img} alt={poke.nombre} className="img"/>

      {/* Botones */}
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

      {/* CONTENIDO DINÁMICO */}

      {open === poke.id + "-desc" && (
        <p>{poke.descripcion}</p>
      )}

      {open === poke.id + "-atk1" && (
        <div>
          {poke.ataques1.map((atk) => (
            <p key={atk}>{atk}</p>
          ))}
        </div>
      )}

      {open === poke.id + "-atk2" && (
        <div>
          {poke.ataques2.map((atk) => (
            <p key={atk}>{atk}</p>
          ))}
        </div>
      )}

      {open === poke.id + "-set" && (
        <p><strong>{poke.set}</strong></p>
      )}

    </div>
  );

  return (
    <div className="personajes">

      <h1>Personajes</h1>

      {/* 🛡️ DEFENSIVOS */}
      <h2>🛡️ Defensivos</h2>
      <div className="grid">
        {defensivos.map(renderPokemon)}
      </div>

      {/* ⚔️ ATACANTES */}
      <h2>⚔️ Atacantes</h2>
      <div className="grid">
        {atacantes.map(renderPokemon)}
      </div>

      {/* ⚖️ EQUILIBRADOS */}
      <h2>⚖️ Equilibrados</h2>
      <div className="grid">
        {equilibrados.map(renderPokemon)}
      </div>

    </div>
  );
}