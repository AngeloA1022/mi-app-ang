import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const USUARIOS_KEY = "usuariosPokemonUnite";

export default function Registro() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [valores, setValores] = useState({
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [tocados, setTocados] = useState({
    usuario: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [mensajeGlobal, setMensajeGlobal] = useState({ texto: "", color: "" });

  // Cargar usuarios desde localStorage
  useEffect(() => {
    const data = localStorage.getItem(USUARIOS_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setUsuarios(parsed);
      } catch {
        setUsuarios([]);
      }
    }
  }, []);

  // Autofocus al abrir modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById("usuario")?.focus();
      }, 100);
    }
  }, [isOpen]);

  const abrirModal = () => setIsOpen(true);

  const cerrarModal = () => {
    setIsOpen(false);
    setValores({ usuario: "", email: "", password: "", confirmPassword: "" });
    setTocados({ usuario: false, email: false, password: false, confirmPassword: false });
    setMensajeGlobal({ texto: "", color: "" });
    setMostrarPassword(false);
  };

  // VALIDACIONES
  const campoVacio = (v) => v.trim() === "";

  const obtenerErrorEmail = (email) => {
    if (campoVacio(email)) return "El correo es obligatorio";
    if (!/@/.test(email)) return "Debe contener @";
    if (!/^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) return "Formato incorrecto";
    if (!/\.(com|cl|net|org)$/i.test(email)) return "Solo .com, .cl, .net o .org";
    return "";
  };

  const obtenerErrorPassword = (password) => {
    if (campoVacio(password)) return "La contraseña es obligatoria";
    const errores = [];
    if (password.length < 8) errores.push("mín. 8 caracteres");
    if (!/[A-Za-z]/.test(password)) errores.push("una letra");
    if (!/\d/.test(password)) errores.push("un número");
    if (!/[@$!%*?&_#]/.test(password)) errores.push("un símbolo");

    return errores.length ? "Debe tener: " + errores.join(", ") : "";
  };

  const erroresValidacion = {
    usuario: campoVacio(valores.usuario)
      ? "Campo obligatorio"
      : valores.usuario.length < 3
      ? "Mínimo 3 caracteres"
      : "",
    email: obtenerErrorEmail(valores.email),
    password: obtenerErrorPassword(valores.password),
    confirmPassword:
      campoVacio(valores.confirmPassword)
        ? "Campo obligatorio"
        : valores.password !== valores.confirmPassword
        ? "Las contraseñas no coinciden"
        : "",
  };

  const manejarInputChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const manejarBlur = (e) => {
    const { name } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  };

  const manejarRegistro = (e) => {
    e.preventDefault();

    setTocados({
      usuario: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const tieneErrores = Object.values(erroresValidacion).some((e) => e !== "");

    if (tieneErrores) {
      setMensajeGlobal({ texto: "Corrige los errores", color: "red" });
      return;
    }

    const existe = usuarios.find((u) => u.email === valores.email.trim());
    if (existe) {
      setMensajeGlobal({ texto: "El correo ya está registrado", color: "orange" });
      return;
    }

    const nuevosUsuarios = [
      ...usuarios,
      {
        usuario: valores.usuario.trim(),
        email: valores.email.trim(),
        password: valores.password.trim(),
      },
    ];

    setUsuarios(nuevosUsuarios);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(nuevosUsuarios));

    setMensajeGlobal({ texto: "Registro exitoso", color: "#00ff88" });

    setTimeout(cerrarModal, 1000);
  };

  const obtenerClaseInput = (campo) => {
    if (!tocados[campo]) return "";
    return erroresValidacion[campo] ? "input-error" : "input-ok";
  };

  return (
    <section className="inicio">
      <div className="container">

        <button onClick={abrirModal} className="btn-abrir-modal">
          Registrarse
        </button>

        {isOpen && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

              <button className="modal-close-btn" onClick={cerrarModal}>
                &times;
              </button>

              <h2>Registro</h2>

              <form onSubmit={manejarRegistro}>

                {/* USUARIO */}
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="Ej: PikachuMaster"
                    value={valores.usuario}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("usuario")}
                  />
                  <small>Mínimo 3 caracteres</small>

                  {tocados.usuario && (
                    <span style={{ color: erroresValidacion.usuario ? "red" : "#00ff88" }}>
                      {erroresValidacion.usuario || "✓ Correcto"}
                    </span>
                  )}
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Ej: usuario@gmail.com"
                    value={valores.email}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("email")}
                  />
                  <small>Formato válido</small>

                  {tocados.email && (
                    <span style={{ color: erroresValidacion.email ? "red" : "#00ff88" }}>
                      {erroresValidacion.email || "✓ Correcto"}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="password"
                    placeholder="Ej: Pikachu@123"
                    value={valores.password}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("password")}
                  />

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      checked={mostrarPassword}
                      onChange={() => setMostrarPassword(!mostrarPassword)}
                    />
                    <label>Mostrar contraseña</label>
                  </div>

                  <small>Debe incluir letras, números y símbolos</small>

                  {tocados.password && (
                    <span style={{ color: erroresValidacion.password ? "red" : "#00ff88" }}>
                      {erroresValidacion.password || "✓ Segura"}
                    </span>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="form-group">
                  <label>Confirmar contraseña</label>
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={valores.confirmPassword}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("confirmPassword")}
                  />

                  <small>Debe coincidir</small>

                  {tocados.confirmPassword && (
                    <span style={{ color: erroresValidacion.confirmPassword ? "red" : "#00ff88" }}>
                      {erroresValidacion.confirmPassword || "✓ Coinciden"}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn-submit">
                  Registrarse
                </button>
              </form>

              {mensajeGlobal.texto && (
                <div style={{ color: mensajeGlobal.color }}>
                  {mensajeGlobal.texto}
                </div>
              )}
            </div>
          </div>
        )}

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