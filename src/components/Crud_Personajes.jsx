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
    img: "",
    ataque1: "",
    ataque2: "",
    ataque3: "",
    ataque4: ""
  });

  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  // 💾 localStorage
  useEffect(() => {
    localStorage.setItem("pokemones", JSON.stringify(pokemones));
  }, [pokemones]);

  // 🧹 limpiar
  const limpiar = () => {
    setPokemon({
      nombre: "",
      descripcion: "",
      categoria: "atacante",
      img: "",
      ataque1: "",
      ataque2: "",
      ataque3: "",
      ataque4: ""
    });
    setEditando(null);
    setError("");
  };

  // ⚠️ validar
  const validar = () => {
    if (!pokemon.nombre.trim()) return "El nombre es obligatorio";
    return "";
  };

  // ✨ formatear nombre
  const formatearNombre = (nombre) =>
    nombre.toLowerCase().charAt(0).toUpperCase() +
    nombre.toLowerCase().slice(1);

  // ➕ AGREGAR (100% manual)
  const agregar = () => {
    const err = validar();
    if (err) return setError(err);

    const nuevo = {
      id: Date.now(),
      nombre: formatearNombre(pokemon.nombre),
      descripcion: pokemon.descripcion,
      categoria: pokemon.categoria,
      img: pokemon.img || "https://via.placeholder.com/60",
      ataques1: [pokemon.ataque1, pokemon.ataque2],
      ataques2: [pokemon.ataque3, pokemon.ataque4]
    };

    setPokemones([...pokemones, nuevo]);
    limpiar();
  };

  // ❌ eliminar
  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar Pokémon?")) return;
    setPokemones(pokemones.filter((p) => p.id !== id));
  };

  // ✏️ editar
  const editar = (p) => {
    setPokemon({
      nombre: p.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      img: p.img,
      ataque1: p.ataques1?.[0] || "",
      ataque2: p.ataques1?.[1] || "",
      ataque3: p.ataques2?.[0] || "",
      ataque4: p.ataques2?.[1] || ""
    });

    setEditando(p.id);
  };

  // 🔄 actualizar (SIN API, 100% libre)
  const actualizar = () => {
    const err = validar();
    if (err) return setError(err);

    const actualizado = {
      id: editando,
      nombre: formatearNombre(pokemon.nombre),
      descripcion: pokemon.descripcion,
      categoria: pokemon.categoria,
      img: pokemon.img || "https://via.placeholder.com/60",
      ataques1: [pokemon.ataque1, pokemon.ataque2],
      ataques2: [pokemon.ataque3, pokemon.ataque4]
    };

    setPokemones(
      pokemones.map((p) =>
        p.id === editando ? actualizado : p
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

          <input
            placeholder="Nombre"
            value={pokemon.nombre}
            onChange={(e) =>
              setPokemon({ ...pokemon, nombre: e.target.value })
            }
          />

          <input
            placeholder="Descripción"
            value={pokemon.descripcion}
            onChange={(e) =>
              setPokemon({ ...pokemon, descripcion: e.target.value })
            }
          />

          <input
            placeholder="Imagen URL"
            value={pokemon.img}
            onChange={(e) =>
              setPokemon({ ...pokemon, img: e.target.value })
            }
          />

          <select
            value={pokemon.categoria}
            onChange={(e) =>
              setPokemon({ ...pokemon, categoria: e.target.value })
            }
          >
            <option value="defensivo">Defensivo</option>
            <option value="atacante">Atacante</option>
            <option value="equilibrado">Equilibrado</option>
          </select>

          <input
            placeholder="Ataque 1"
            value={pokemon.ataque1}
            onChange={(e) =>
              setPokemon({ ...pokemon, ataque1: e.target.value })
            }
          />

          <input
            placeholder="Ataque 2"
            value={pokemon.ataque2}
            onChange={(e) =>
              setPokemon({ ...pokemon, ataque2: e.target.value })
            }
          />

          <input
            placeholder="Ataque 3"
            value={pokemon.ataque3}
            onChange={(e) =>
              setPokemon({ ...pokemon, ataque3: e.target.value })
            }
          />

          <input
            placeholder="Ataque 4"
            value={pokemon.ataque4}
            onChange={(e) =>
              setPokemon({ ...pokemon, ataque4: e.target.value })
            }
          />

          {editando ? (
            <>
              <button onClick={actualizar}>Actualizar</button>
              <button onClick={limpiar}>Cancelar</button>
            </>
          ) : (
            <button onClick={agregar}>Agregar Pokémon</button>
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
              <th>Ataques</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pokemones.length === 0 ? (
              <tr>
                <td colSpan="6">No hay Pokémon</td>
              </tr>
            ) : (
              pokemones.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.img}
                      width="60"
                      alt={p.nombre}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/60")
                      }
                    />
                  </td>

                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {p.categoria}
                  </td>

                  <td>
                    {p.ataques1?.join(", ")}
                    <br />
                    {p.ataques2?.join(", ")}
                  </td>

                  <td>
                    <button onClick={() => editar(p)}>Editar</button>
                    <button onClick={() => eliminar(p.id)}>
                      Eliminar
                    </button>
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