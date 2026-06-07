import React, { useState } from "react";

const initialForm = {
  usuario: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Registro() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.usuario.trim()) {
      nextErrors.usuario = "El usuario es obligatorio.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Ingresa un correo válido.";
    }

    if (!form.password) {
      nextErrors.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirma la contraseña.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setMessage("");
      return;
    }

    setMessage("Registro exitoso. ¡Bienvenido!");
    setForm(initialForm);
    setErrors({});
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <section id="registro" className="registro">
      <div className="container">
        <h2>Registro</h2>
        <p>Completa el formulario para crear tu cuenta.</p>
        <button type="button" className="nav-btn" onClick={() => setIsModalOpen(true)}>
          Abrir formulario de registro
        </button>
      </div>

      <div className="modal" style={{ display: isModalOpen ? "flex" : "none" }}>
        <div className="modal-contenido">
          <span className="cerrar" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>

          <h4>Registro</h4>

          <form id="registroForm" noValidate onSubmit={handleSubmit}>
            {/* USUARIO */}
            <input
              type="text"
              id="usuario"
              placeholder="Usuario"
              value={form.usuario}
              onChange={handleChange}
              className={errors.usuario ? "input-error" : ""}
            />
            <small id="errorUsuario" className="error">
              {errors.usuario}
            </small>

            {/* EMAIL */}
            <input
              type="email"
              id="email"
              placeholder="Correo"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            <small id="errorEmail" className="error">
              {errors.email}
            </small>

            {/* PASSWORD */}
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            <button type="button" className="toggle-password" onClick={() => togglePassword("password")}>Mostrar</button>
            <small id="errorPassword" className="error">
              {errors.password}
            </small>

            {/* CONFIRMAR PASSWORD */}
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            <button type="button" className="toggle-password" onClick={() => togglePassword("confirmPassword")}>Mostrar</button>
            <small id="errorConfirmPassword" className="error">
              {errors.confirmPassword}
            </small>

            <button type="submit">Registrarse</button>

            <p id="mensajeRegistro">{message}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
