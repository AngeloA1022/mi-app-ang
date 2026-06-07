import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  // Estado para controlar la visibilidad del modal
  const [isOpen, setIsOpen] = useState(false);

  // Estado para manejar los mensajes de error/éxito en tiempo real de forma dinámica
  const [errores, setErrores] = useState([]);
  const [loginExitoso, setLoginExitoso] = useState(false);

  const abrirModal = () => setIsOpen(true);
  
  const cerrarModal = () => {
    setIsOpen(false);
    setErrores([]);
    setLoginExitoso(false);
  };

  const manejarLogin = (event) => {
    // ● Validación Preventiva: Uso obligatorio de event.preventDefault()
    event.preventDefault();

    // ● Manipulación del DOM: Captura de valores mediante document.getElementById
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    let listaErrores = [];

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      listaErrores.push("Todos los campos son obligatorios.");
    }

    // ● Validar que el email tenga un formato válido (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      listaErrores.push("El formato del correo electrónico no es válido.");
    }

    // ● Feedback en Tiempo Real: Renderizado dinámico en la pantalla
    if (listaErrores.length > 0) {
      setErrores(listaErrores);
      setLoginExitoso(false);
    } else {
      setErrores([]);
      setLoginExitoso(true);
      
      // Limpieza del formulario tras un login exitoso utilizando el DOM
      document.getElementById("form-login").reset();
    }
  };

  return (
    <section id="inicio" className="inicio">
      <div className="container">
        
        {/* Botón para abrir el modal */}
        <button onClick={abrirModal} className="btn-abrir-modal">
          Iniciar Sesión
        </button>

        {/* ESTRUCTURA DEL MODAL (Condicional) */}
        {isOpen && (
          <div className="modal-overlay" onClick={cerrarModal}>
            {/* e.stopPropagation() evita que el modal se cierre al hacer click dentro del formulario */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              
              <button className="modal-close-btn" onClick={cerrarModal}>
                &times;
              </button>

              <h2>Iniciar Sesión</h2>
              
              <form id="form-login" onSubmit={manejarLogin}>
                <div className="form-group">
                  <label htmlFor="login-email">Email:</label>
                  <input type="text" id="login-email" name="email" />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Contraseña:</label>
                  <input type="password" id="login-password" name="password" />
                </div>

                <button type="submit" className="btn-submit">Ingresar</button>
              </form>

              {/* Elementos HTML dinámicos para feedback de errores */}
              {errores.length > 0 && (
                <div className="errores-feedback">
                  <ul>
                    {errores.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Elemento HTML dinámico para feedback de éxito */}
              {loginExitoso && (
                <div className="exito-feedback">
                  <strong>¡Ingreso completado con éxito!</strong>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Sección de Enlaces */}
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
