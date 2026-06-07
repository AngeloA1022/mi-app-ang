import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const USUARIOS_KEY = "usuariosPokemonUnite";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Control de strings del formulario de login
  const [valores, setValores] = useState({
    email: "",
    password: "",
  });

  // Control de interacción para activar los textos de error individualmente
  const [tocados, setTocados] = useState({
    email: false,
    password: false,
  });

  const [mensajeGlobal, setMensajeGlobal] = useState({ texto: "", color: "" });

  // Cargar base de datos local al iniciar para validar credenciales
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
  }, [isOpen]); // Recarga la lista de usuarios cada vez que se abre el modal

  const abrirModal = () => setIsOpen(true);
  
  const cerrarModal = () => {
    setIsOpen(false);
    setValores({ email: "", password: "" });
    setTocados({ email: false, password: false });
    setMensajeGlobal({ texto: "", color: "" });
  };

  // --- FUNCIONES DE VALIDACIÓN ---
  const campoVacio = (valor) => valor.trim() === "";

  const obtenerErrorEmail = (email) => {
    if (campoVacio(email)) return "Campo obligatorio";
    if (!/@/.test(email)) return "Debe contener @";
    if (!/^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) return "Formato incorrecto";
    if (!/\.(com|cl|net|org)$/i.test(email)) {
      return "Solo se permiten dominios con extensión .com, .cl, .net o .org";
    }
    return "";
  };

  // --- EVALUACIÓN EN TIEMPO REAL ---
  const erroresValidacion = {
    email: obtenerErrorEmail(valores.email),
    password: campoVacio(valores.password) ? "Campo obligatorio" : "",
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
  const manejarLogin = (event) => {
    event.preventDefault();

    // Activar los feedbacks al intentar enviar
    setTocados({ email: true, password: true });

    const tieneErrores = Object.values(erroresValidacion).some(error => error !== "");

    if (tieneErrores) {
      setMensajeGlobal({ texto: "Corrige los errores", color: "red" });
      return;
    }

    // Buscar al usuario por correo y verificar contraseña
    const usuarioEncontrado = usuarios.find(
      u => u.email === valores.email.trim() && u.password === valores.password.trim()
    );

    if (!usuarioEncontrado) {
      setMensajeGlobal({ texto: "Credenciales incorrectas o usuario no registrado", color: "red" });
      return;
    }

    setMensajeGlobal({ texto: "Login exitoso", color: "#00ff88" });

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
    <section id="inicio" className="inicio">
      <div className="container">
        
        <button onClick={abrirModal} className="btn-abrir-modal">
          Iniciar Sesión
        </button>

        {isOpen && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              
              <button className="modal-close-btn" onClick={cerrarModal}>
                &times;
              </button>

              <h2>Iniciar Sesión</h2>
              
              <form id="form-login" onSubmit={manejarLogin}>
                
                <div className="form-group">
                  <label htmlFor="emailLogin">Email:</label>
                  <input 
                    type="text" 
                    id="emailLogin" 
                    name="email" 
                    value={valores.email}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("email")}
                  />
                  {tocados.email && (
                    <span id="errorEmailLogin" style={{ color: erroresValidacion.email ? "red" : "#00ff88" }}>
                      {erroresValidacion.email || "✓ Correcto"}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="passwordLogin">Contraseña:</label>
                  <input 
                    type="password" 
                    id="passwordLogin" 
                    name="password" 
                    value={valores.password}
                    onChange={manejarInputChange}
                    onBlur={manejarBlur}
                    className={obtenerClaseInput("password")}
                  />
                  {tocados.password && (
                    <span id="errorPasswordLogin" style={{ color: erroresValidacion.password ? "red" : "#00ff88" }}>
                      {erroresValidacion.password || "✓ Correcto"}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn-submit">Ingresar</button>
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