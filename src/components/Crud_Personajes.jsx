import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import blastoise from "../images/blastoise.png";
import charizard from "../images/charizard.png";
import goodra from "../images/goodra.png";
import pikachu from "../images/pikachu.png";
import urshifu from "../images/urshifu.png";
import venusaur from "../images/venusaur.png";

const STORAGE_KEY = "pokemones";
const CATEGORIAS_VALIDAS = ["defensivo", "atacante", "equilibrado"];
const PLACEHOLDER_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
const IMAGENES_LOCALES = {
  blastoise,
  charizard,
  goodra,
  pikachu,
  urshifu,
  venusaur
};

const estadoInicial = {
  nombre: "",
  descripcion: "",
  categoria: "atacante",
  img: "",
  ataque1: "",
  ataque2: "",
  ataque3: "",
  ataque4: ""
};

const limpiarTexto = (valor) =>
  String(valor ?? "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>]/g, "")
    .trim();

const formatearBonito = (texto) =>
  limpiarTexto(texto)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const formatearNombre = (nombre) => {
  const limpio = limpiarTexto(nombre).toLowerCase();
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
};

const esUrlSegura = (url) => {
  const valor = limpiarTexto(url);

  if (/^(\/|\.\/|\.\.\/)[^<>]*$/u.test(valor)) return true;
  if (/^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(valor)) return true;

  try {
    const parsed = new URL(valor);
    return ["http:", "https:", "blob:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const obtenerImagenSegura = (nombre, img) => {
  const clave = limpiarTexto(nombre).toLowerCase();
  const imagenLocal = IMAGENES_LOCALES[clave];

  if (!img || img === PLACEHOLDER_IMG) {
    return imagenLocal || PLACEHOLDER_IMG;
  }

  return esUrlSegura(img) ? img : imagenLocal || PLACEHOLDER_IMG;
};

const crearPokemonesBase = () => [
  {
    id: "blastoise",
    nombre: "Blastoise",
    img: blastoise,
    descripcion: "Gran defensa y control de zona.",
    ataques1: ["Hidrobomba", "Salpicadura"],
    ataques2: ["Surf", "Giro Rapido"],
    set: "Defensivo",
    categoria: "defensivo"
  },
  {
    id: "goodra",
    nombre: "Goodra",
    img: goodra,
    descripcion: "Defensivo de corto alcance y dano especial elevado.",
    ataques1: ["Agua lodosa", "Pulso Dragon"],
    ataques2: ["Latigazo", "Bomba Acida"],
    set: "Defensivo",
    categoria: "defensivo"
  },
  {
    id: "venusaur",
    nombre: "Venusaur",
    img: venusaur,
    descripcion: "Buen balance entre ataque y resistencia.",
    ataques1: ["Bomba Lodo", "Drenadoras"],
    ataques2: ["Rayo Solar", "Gigadrenado"],
    set: "Especial",
    categoria: "atacante"
  },
  {
    id: "pikachu",
    nombre: "Pikachu",
    img: pikachu,
    descripcion: "Ataques electricos rapidos.",
    ataques1: ["Impactrueno", "Electrotela"],
    ataques2: ["Rayo", "Trueno"],
    set: "Velocidad",
    categoria: "atacante"
  },
  {
    id: "charizard",
    nombre: "Charizard",
    img: charizard,
    descripcion: "Alto dano y movilidad.",
    ataques1: ["Lanzallamas", "Puno Fuego"],
    ataques2: ["Envite Igneo", "Llamarada"],
    set: "Ofensivo",
    categoria: "equilibrado"
  },
  {
    id: "urshifu",
    nombre: "Urshifu",
    img: urshifu,
    descripcion: "Ataque continuo, aguante y movilidad.",
    ataques1: ["Golpe Oscuro", "Azote Torrencial"],
    ataques2: ["Golpe Mordaza", "Hidroariete"],
    set: "Ofensivo",
    categoria: "equilibrado"
  }
];

const sanitizarPokemon = (datos) => {
  const categoria = limpiarTexto(datos.categoria).toLowerCase();

  return {
    nombre: limpiarTexto(datos.nombre),
    descripcion: limpiarTexto(datos.descripcion),
    categoria: CATEGORIAS_VALIDAS.includes(categoria) ? categoria : "atacante",
    img: limpiarTexto(datos.img),
    ataque1: limpiarTexto(datos.ataque1),
    ataque2: limpiarTexto(datos.ataque2),
    ataque3: limpiarTexto(datos.ataque3),
    ataque4: limpiarTexto(datos.ataque4)
  };
};

const normalizarPokemonGuardado = (item) => {
  if (!item || typeof item !== "object") return null;

  const limpio = sanitizarPokemon({
    nombre: item.nombre,
    descripcion: item.descripcion,
    categoria: item.categoria,
    img: item.img,
    ataque1: item.ataques1?.[0],
    ataque2: item.ataques1?.[1],
    ataque3: item.ataques2?.[0],
    ataque4: item.ataques2?.[1]
  });

  if (!limpio.nombre) return null;

  return {
    id: item.id || crypto.randomUUID(),
    apiName: limpiarTexto(item.apiName || limpio.nombre.toLowerCase()),
    nombre: formatearNombre(limpio.nombre),
    descripcion: limpio.descripcion || "Sin descripcion disponible",
    categoria: limpio.categoria,
    img: obtenerImagenSegura(limpio.nombre, limpio.img),
    ataques1: [limpio.ataque1, limpio.ataque2].filter(Boolean),
    ataques2: [limpio.ataque3, limpio.ataque4].filter(Boolean)
  };
};

export default function CrudPokemon() {
  const [pokemones, setPokemones] = useState([]);
  const [pokemon, setPokemon] = useState(estadoInicial);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [datosCargados, setDatosCargados] = useState(false);
  const cacheAtaques = useRef({});

  useEffect(() => {
    let pokemonesIniciales = [];
    let errorInicial = "";

    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      if (datos) {
        const parsed = JSON.parse(datos);
        if (!Array.isArray(parsed)) {
          throw new Error("Formato invalido en localStorage");
        }

        pokemonesIniciales = parsed.map(normalizarPokemonGuardado).filter(Boolean);
      } else {
        pokemonesIniciales = crearPokemonesBase();
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      errorInicial = "Los datos guardados estaban danados y fueron reiniciados.";
    }

    queueMicrotask(() => {
      setPokemones(pokemonesIniciales);
      if (errorInicial) setError(errorInicial);
      setDatosCargados(true);
    });
  }, []);

  useEffect(() => {
    if (!datosCargados) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemones));
    } catch {
      queueMicrotask(() => {
        setError("No se pudieron guardar los datos en el navegador.");
      });
    }
  }, [datosCargados, pokemones]);

  const limpiar = () => {
    setPokemon(estadoInicial);
    setEditando(null);
    setError("");
  };

  const actualizarCampo = (campo, valor) => {
    setPokemon((actual) => ({
      ...actual,
      [campo]: valor
    }));
  };

  const validarBase = (datos) => {
    const limpio = sanitizarPokemon(datos);

    if (!limpio.nombre) return "El nombre es obligatorio.";
    if (!/^[a-zA-Z0-9-]{1,40}$/.test(limpio.nombre)) {
      return "El nombre solo puede contener letras, numeros y guiones.";
    }
    if (!CATEGORIAS_VALIDAS.includes(limpio.categoria)) {
      return "Seleccione una categoria valida.";
    }

    return "";
  };

  const validarEdicion = (datos) => {
    const errorBase = validarBase(datos);
    if (errorBase) return errorBase;

    const limpio = sanitizarPokemon(datos);
    const camposTexto = [
      limpio.descripcion,
      limpio.ataque1,
      limpio.ataque2,
      limpio.ataque3,
      limpio.ataque4
    ];

    if (camposTexto.some((campo) => !campo)) {
      return "Descripcion e informacion de ataques no pueden estar vacias.";
    }
    if (!limpio.img || !esUrlSegura(limpio.img)) {
      return "Ingrese una URL de imagen valida y segura.";
    }

    return "";
  };

  const fetchJson = async (url, mensajeError) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${mensajeError} Codigo HTTP: ${res.status}`);
    }

    try {
      return await res.json();
    } catch {
      throw new Error("La API respondio con datos en un formato invalido.");
    }
  };

  const getDescripcion = async (nombre) => {
    try {
      const data = await fetchJson(
        `https://pokeapi.co/api/v2/pokemon-species/${nombre}`,
        "No se pudo obtener la descripcion del Pokemon."
      );

      const entry = data.flavor_text_entries?.find(
        (e) => e.language?.name === "es"
      );

      return entry
        ? limpiarTexto(entry.flavor_text.replace(/\n|\f/g, " "))
        : "Sin descripcion disponible";
    } catch {
      return "Sin descripcion disponible";
    }
  };

  const traducirAtaque = async (moveName) => {
    if (cacheAtaques.current[moveName]) {
      return cacheAtaques.current[moveName];
    }

    try {
      const data = await fetchJson(
        `https://pokeapi.co/api/v2/move/${moveName}`,
        "No se pudo traducir un ataque."
      );

      const traduccion = data.names?.find((n) => n.language?.name === "es");
      const nombreFinal = traduccion
        ? limpiarTexto(traduccion.name)
        : formatearBonito(moveName);

      cacheAtaques.current[moveName] = nombreFinal;
      return nombreFinal;
    } catch {
      return formatearBonito(moveName);
    }
  };

  const scoreMove = (move, types) => {
    const power = Number(move.power) || 0;
    const accuracy = Number(move.accuracy) || 80;
    const stab = types.includes(move.type?.name) ? 1.5 : 1;

    return power * stab * (accuracy / 100);
  };

  const obtenerMovimientosCompetitivos = async (data, tiposPokemon) => {
    const movimientos = await Promise.all(
      data.moves.map(async (m) => {
        const moveData = await fetchJson(
          m.move.url,
          "No se pudo obtener un movimiento del Pokemon."
        );

        return {
          name: m.move.name,
          power: moveData.power,
          accuracy: moveData.accuracy,
          type: moveData.type
        };
      })
    );

    const ataquesCompetitivos = movimientos
      .filter((m) => Number(m.power) > 0)
      .sort((a, b) => scoreMove(b, tiposPokemon) - scoreMove(a, tiposPokemon))
      .slice(0, 4);

    if (ataquesCompetitivos.length < 4) {
      throw new Error("No se encontraron 4 ataques competitivos para este Pokemon.");
    }

    return Promise.all(ataquesCompetitivos.map((m) => traducirAtaque(m.name)));
  };

  const agregar = async () => {
    const datosLimpios = sanitizarPokemon(pokemon);
    const err = validarBase(datosLimpios);
    if (err) return setError(err);

    setLoading(true);
    setError("");

    try {
      const nombre = datosLimpios.nombre.toLowerCase();
      const data = await fetchJson(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`,
        "No se pudo encontrar el Pokemon."
      );

      const descripcion = await getDescripcion(data.name);
      const tiposPokemon = data.types.map((t) => t.type?.name).filter(Boolean);
      const ataques = await obtenerMovimientosCompetitivos(data, tiposPokemon);
      const imagen =
        data.sprites?.other?.["official-artwork"]?.front_default ||
        data.sprites?.front_default ||
        PLACEHOLDER_IMG;

      const nuevo = {
        id: crypto.randomUUID(),
        apiName: limpiarTexto(data.name),
        nombre: formatearNombre(data.name),
        descripcion,
        categoria: datosLimpios.categoria,
        img: esUrlSegura(imagen) ? imagen : PLACEHOLDER_IMG,
        ataques1: ataques.slice(0, 2).map(limpiarTexto),
        ataques2: ataques.slice(2, 4).map(limpiarTexto)
      };

      setPokemones((actuales) => [...actuales, nuevo]);
      limpiar();
    } catch (err) {
      setError(err.message || "No se pudo guardar el Pokemon. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = (id) => {
    if (!window.confirm("Eliminar Pokemon?")) return;
    setPokemones((actuales) => actuales.filter((p) => p.id !== id));
  };

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
    setError("");
  };

  const actualizar = () => {
    const datosLimpios = sanitizarPokemon(pokemon);
    const err = validarEdicion(datosLimpios);
    if (err) return setError(err);

    const actual = pokemones.find((p) => p.id === editando);
    const actualizado = {
      id: editando,
      apiName: actual?.apiName || datosLimpios.nombre.toLowerCase(),
      nombre: formatearNombre(datosLimpios.nombre),
      descripcion: datosLimpios.descripcion,
      categoria: datosLimpios.categoria,
      img: datosLimpios.img,
      ataques1: [datosLimpios.ataque1, datosLimpios.ataque2],
      ataques2: [datosLimpios.ataque3, datosLimpios.ataque4]
    };

    setPokemones((actuales) =>
      actuales.map((p) => (p.id === editando ? actualizado : p))
    );

    limpiar();
  };

  return (
    <section className="crud-section">
      <div className="crud-container">
        <h1>CRUD Pokemon</h1>

        <div className="form">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p>Cargando datos desde PokeAPI...</p>}

          <input
            placeholder="Nombre"
            value={pokemon.nombre}
            disabled={loading}
            onChange={(e) => actualizarCampo("nombre", e.target.value)}
          />

          <input
            placeholder="Descripcion"
            value={pokemon.descripcion}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("descripcion", e.target.value)}
          />

          <input
            placeholder="Imagen URL"
            value={pokemon.img}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("img", e.target.value)}
          />

          <select
            value={pokemon.categoria}
            disabled={loading}
            onChange={(e) => actualizarCampo("categoria", e.target.value)}
          >
            <option value="defensivo">Defensivo</option>
            <option value="atacante">Atacante</option>
            <option value="equilibrado">Equilibrado</option>
          </select>

          <input
            placeholder="Ataque 1"
            value={pokemon.ataque1}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("ataque1", e.target.value)}
          />
          <input
            placeholder="Ataque 2"
            value={pokemon.ataque2}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("ataque2", e.target.value)}
          />
          <input
            placeholder="Ataque 3"
            value={pokemon.ataque3}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("ataque3", e.target.value)}
          />
          <input
            placeholder="Ataque 4"
            value={pokemon.ataque4}
            disabled={loading || !editando}
            onChange={(e) => actualizarCampo("ataque4", e.target.value)}
          />

          {editando ? (
            <>
              <button disabled={loading} onClick={actualizar}>
                Actualizar
              </button>
              <button disabled={loading} onClick={limpiar}>
                Cancelar
              </button>
            </>
          ) : (
            <button disabled={loading} onClick={agregar}>
              {loading ? "Agregando..." : "Agregar Pokemon"}
            </button>
          )}
        </div>

        <hr />

        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Ataques</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pokemones.length === 0 ? (
              <tr>
                <td colSpan="6">No hay Pokemon</td>
              </tr>
            ) : (
              pokemones.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.img} width="60" alt={p.nombre} />
                  </td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.categoria}</td>
                  <td>
                    {p.ataques1?.join(", ")}
                    <br />
                    {p.ataques2?.join(", ")}
                  </td>
                  <td>
                    <button disabled={loading} onClick={() => editar(p)}>
                      Editar
                    </button>
                    <button disabled={loading} onClick={() => eliminar(p.id)}>
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
