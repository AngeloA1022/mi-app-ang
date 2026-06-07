import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Ingresa un correo válido.";
    }

    if (!password) {
      nextErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage("");
      return;
    }

    setMessage("Inicio de sesión exitoso.");
  };

  return (
    <section className="registro">
      <div className="container">
        <h2>Login</h2>
        <p>Ingresa tus datos para acceder.</p>
      </div>

      <div className="modal" style={{ display: "flex" }}>
        <div className="modal-contenido">
          <h4>Login</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : "input-ok"}
            />
            <small className="error">{errors.email}</small>

            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : "input-ok"}
            />
            <small className="error">{errors.password}</small>

            <button type="submit">Iniciar sesión</button>
            <p>{message}</p>
          </form>

          <p style={{ marginTop: "10px", textAlign: "center" }}>
            ¿No tienes cuenta? <Link to="/Registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
