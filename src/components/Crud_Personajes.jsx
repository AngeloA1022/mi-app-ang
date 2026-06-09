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
  };

  const agregar = () => {
    if (!pokemon.nombre.trim()) return;

    const nuevo = {
      id: Date.now(),
      ...pokemon,
      // Propiedades por defecto para que la vista de personajes no falle
      ataques1: ["Ataque Básico"],
      ataques2: ["Movimiento Unite"],
      set: "Estándar"
    };

    setPokemones([...pokemones, nuevo]);
    limpiar();
  };

  const eliminar = (id) => {
    setPokemones(pokemones.filter(p => p.id !== id));
  };

  const editar = (p) => {
    setPokemon({
      nombre: p.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      img: p.img || ""
    });
    setEditando(p.id);
  };

  const actualizar = () => {
    setPokemones(
      pokemones.map(p =>
        // Conservamos los datos antiguos de 'p' (como ataques) y sobreescribimos con 'pokemon'
        p.id === editando ? { ...p, ...pokemon, id: editando } : p
      )
    );
    limpiar();
  };

  return (
    <section className="crud-section">
      <div className="crud-container">
        <h1>CRUD Pokémon</h1>

        <div className="form">
          <input
            placeholder="Nombre"
            value={pokemon.nombre}
            onChange={(e) => setPokemon({ ...pokemon, nombre: e.target.value })}
          />

          <input
            placeholder="Descripción"
            value={pokemon.descripcion}
            onChange={(e) => setPokemon({ ...pokemon, descripcion: e.target.value })}
          />

          <input
            placeholder="URL Imagen"
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
            <button onClick={actualizar}>Actualizar</button>
          ) : (
            <button onClick={agregar}>Agregar</button>
          )}
        </div>

        <hr />

        <div className="table-container">
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
                  <td colSpan="5">No hay Pokémon registrados</td>
                </tr>
              ) : (
                pokemones.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.img && (
                        <img
                          src={p.img}
                          alt={p.nombre}
                          width="50"
                          style={{ objectFit: "cover" }}
                        />
                      )}
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
        </div>

        <br />
        <Link to="/personajes">Ver Personajes</Link>
      </div>
    </section>
  );
}