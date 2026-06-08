import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const USUARIOS_KEY = "usuariosPokemonUnite";

export default function Registro() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Control de strings del formulario
  const [valores, setValores] = useState({
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Control de interacción para activar los textos de error individualmente
  const [tocados, setTocados] = useState({
    usuario: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [mensajeGlobal, setMensajeGlobal] = useState({ texto: "", color: "" });

  // Cargar base de datos local al iniciar
  useEffect(() => {
    const data = localStorage.getItem(USUARIOS_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setUsuarios(parsed);
      } catch (e) {
        setUsuarios([]);
      }
    }
  }, []);

  const abrirModal = () => setIsOpen(true);
  
  const cerrarModal = () => {
    setIsOpen(false);
    setValores({ usuario: "", email: "", password: "", confirmPassword: "" });
    setTocados({ usuario: false, email: false, password: false, confirmPassword: false });
    setMensajeGlobal({ texto: "", color: "" });
  };

  // --- FUNCIONES DE VALIDACIÓN ---
  const campoVacio = (valor) => valor.trim() === "";

  const obtenerErrorEmail = (email) => {
    if (campoVacio(email)) return "El correo es obligatorio";
    if (!/@/.test(email)) return "Debe contener @";
    if (!/^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) return "Formato incorrecto";
    if (!/\.(com|cl|net|org)$/i.test(email)) {
      return "Solo se permiten dominios con extensión .com, .cl, .net o .org";
    }
    return "";
  };

  const obtenerErrorPassword = (password) => {
    if (campoVacio(password)) return "La contraseña es obligatoria";
    const errores = [];
    if (password.length < 8) errores.push("Mínimo 8 caracteres");
    if (!/[A-Za-z]/.test(password)) errores.push("al menos una letra");
    if (!/\d/.test(password)) errores.push("al menos un número");
    if (!/[@$!%*?&_#]/.test(password)) errores.push("al menos un carácter especial (@$!%*?&_#)");
    
    return errores.length > 0 ? "Necesita: " + errores.join(", ") : "";
  };

  // --- EVALUACIÓN EN TIEMPO REAL ---
  const erroresValidacion = {
    usuario: campoVacio(valores.usuario) 
      ? "Campo obligatorio" 
      : valores.usuario.length < 3 ? "Mínimo 3 caracteres" : "",
    email: obtenerErrorEmail(valores.email),
    password: obtenerErrorPassword(valores.password),
    confirmPassword: valores.password !== valores.confirmPassword 
      ? "Las contraseñas no coinciden" 
      : campoVacio(valores.confirmPassword) ? "Campo obligatorio" : ""
  };

  const manejarInputChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({ ...prev, [name]: value }));
  };

  const manejarBlur = (e) => {
    const { name } = e.target;
    setTocados(prev => ({ ...prev, [name]: true }));
  };

  // --- SUBMIT DEL FORMULARIO ---
  const manejarRegistro = (event) => {
    event.preventDefault();

    // Activar todos los feedbacks simultáneamente al intentar enviar
    setTocados({ usuario: true, email: true, password: true, confirmPassword: true });

    const tieneErrores = Object.values(erroresValidacion).some(error => error !== "");

    if (tieneErrores) {
      setMensajeGlobal({ texto: "Corrige los errores", color: "red" });
      return;
    }

    const existe = usuarios.find(u => u.email === valores.email.trim());
    if (existe) {
      setMensajeGlobal({ texto: "El correo ya está registrado", color: "orange" });
      return;
    }

    const nuevosUsuarios = [...usuarios, { 
      usuario: valores.usuario.trim(), 
      email: valores.email.trim(), 
      password: valores.password.trim() 
    }];
    
    setUsuarios(nuevosUsuarios);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(nuevosUsuarios));

    setMensajeGlobal({ texto: "Registro exitoso", color: "#00ff88" });

    setTimeout(() => {
      cerrarModal();
    }, 1000);
  };

  // Generador dinámico de clases según el estado de validación
  const obtenerClaseInput = (campo) => {
    if (!tocados[campo]) return ""; 
    return erroresValidacion[campo] ? "input-error" : "input-ok";
  };

  return (
    <section id="registro" className="inicio">
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

              <h2>Formulario de Registro</h2>
              
              <form id="registroForm" onSubmit={manejarRegistro}>
                
                <div className="form-group">
                  <label htmlFor="usuario">Usuario:</label>
                  <input 
                    type="text" 
                    id="usuario" 
                    name="usuario" 
                    value={valores.usuario}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("usuario")}
                  />
                  {tocados.usuario && (
                    <span id="errorUsuario" style={{ color: erroresValidacion.usuario ? "red" : "#00ff88" }}>
                      {erroresValidacion.usuario || "Correcto"}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="emailRegistro">Email:</label>
                  <input 
                    type="text" 
                    id="emailRegistro" 
                    name="email" 
                    value={valores.email}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("email")}
                  />
                  {tocados.email && (
                    <span id="errorEmail" style={{ color: erroresValidacion.email ? "red" : "#00ff88" }}>
                      {erroresValidacion.email || "✓ Correcto"}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={valores.password}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("password")}
                  />
                  {tocados.password && (
                    <span id="errorPassword" style={{ color: erroresValidacion.password ? "red" : "#00ff88" }}>
                      {erroresValidacion.password || "✓ Contraseña segura"}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={valores.confirmPassword}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("confirmPassword")}
                  />
                  {tocados.confirmPassword && (
                    <span id="errorConfirmPassword" style={{ color: erroresValidacion.confirmPassword ? "red" : "#00ff88" }}>
                      {erroresValidacion.confirmPassword || "Coinciden"}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn-submit">Registrarse</button>
              </form>

              {mensajeGlobal.texto && (
                <div id="mensajeRegistro" style={{ color: mensajeGlobal.color }}>
                  {mensajeGlobal.texto}
                </div>
              )}

            </div>
          </div>
        )}

        <section>
          <div className="enlaces">
            <h2>Enlaces Útiles</h2>
            <Link to="/">Volver a Inicio</Link>
          </div>
        </section>
        
      </div>
    </section>
  );
}

