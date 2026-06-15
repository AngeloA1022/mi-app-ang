import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CrudPokemon() {
  const [pokemones, setPokemones] = useState(() => {
    const datos = localStorage.getItem("pokemones");
    return datos ? JSON.parse(datos) : [];
  });

  const [pokemon, setPokemon] = useState({
    nombre: "",
    descripcion: "",
    categoria: "atacante",
    img: ""
  });

  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("pokemones", JSON.stringify(pokemones));
  }, [pokemones]);

  const limpiar = () => {
    setPokemon({
      nombre: "",
      descripcion: "",
      categoria: "atacante",
      img: ""
    });
    setEditando(null);
    setError("");
  };

  const validar = () => {
    if (!pokemon.nombre.trim()) return "El nombre es obligatorio";
    if (!pokemon.descripcion.trim()) return "La descripción es obligatoria";
    return "";
  };

  // CREATE
  const agregar = () => {
    const err = validar();
    if (err) return setError(err);

    const nuevo = {
      id: Date.now(),
      ...pokemon,
      ataques1: ["Ataque Básico"],
      ataques2: ["Movimiento Unite"],
      set: "Estándar"
    };

    setPokemones([...pokemones, nuevo]);
    limpiar();
  };

  // DELETE
  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar este Pokémon?")) return;
    setPokemones(pokemones.filter(p => p.id !== id));
  };

  // EDIT
  const editar = (p) => {
    setPokemon({
      nombre: p.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      img: p.img || ""
    });
    setEditando(p.id);
  };

  // UPDATE
  const actualizar = () => {
    const err = validar();
    if (err) return setError(err);

    setPokemones(
      pokemones.map(p =>
        p.id === editando ? { ...p, ...pokemon } : p
      )
    );

    limpiar();
  };

  return (
    <section className="crud-section">
      <div className="crud-container">
        <h1>CRUD Pokémon</h1>

        <div className="form">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <p>(Ej: Nombre_del_pokemon) </p>
          <input
            placeholder="Nombre"
            value={pokemon.nombre}
            onChange={(e) => setPokemon({ ...pokemon, nombre: e.target.value })}
          />

          <p>(Ej: Gran poder y gran velocidad) </p>
          <input
            placeholder="Descripción"
            value={pokemon.descripcion}
            onChange={(e) => setPokemon({ ...pokemon, descripcion: e.target.value })}
          />
          <p>(Ej: /src/images/nombre_del_pokemon.png) </p>
          <input
            placeholder="Imagen (Ej: /src/images/nombre_del_pokemon.png)"
            value={pokemon.img}
            onChange={(e) => setPokemon({ ...pokemon, img: e.target.value })}
          />

          <select
            value={pokemon.categoria}
            onChange={(e) => setPokemon({ ...pokemon, categoria: e.target.value })}
          >
            <option value="defensivo">Defensivo</option>
            <option value="atacante">Atacante</option>
            <option value="equilibrado">Equilibrado</option>
          </select>

          {editando ? (
            <>
              <button onClick={actualizar}>Actualizar</button>
              <button onClick={limpiar}>Cancelar</button>
            </>
          ) : (
            <button onClick={agregar}>Agregar</button>
          )}
        </div>

        <hr />

        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pokemones.length === 0 ? (
              <tr>
                <td colSpan="5">No hay datos</td>
              </tr>
            ) : (
              pokemones.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.img || "https://via.placeholder.com/50"}
                      width="50"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/50";
                      }}
                      alt={p.nombre}
                    />
                  </td>

                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.categoria}</td>

                  <td>
                    <button onClick={() => editar(p)}>Editar</button>
                    <button onClick={() => eliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <br />
        <Link to="/personajes">Ver Personajes</Link>
      </div>
    </section>
  );
}