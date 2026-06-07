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

  const campoVacio = (valor) => valor.trim() === "";

  const obtenerErrorEmail = (email) => {
    if (!/@/.test(email)) return "Debe contener @";
    if (!/^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email))
      return "Formato incorrecto";
    if (!/\.(com|cl|net|org)$/i.test(email))
      return "Solo .com, .cl, .net o .org";
    return "";
  };

  const obtenerErrorPassword = (password) => {
    const errores = [];

    if (password.length < 8) errores.push("mínimo 8 caracteres");
    if (!/[A-Za-z]/.test(password)) errores.push("una letra");
    if (!/\d/.test(password)) errores.push("un número");
    if (!/[@$!%*?&_#]/.test(password))
      errores.push("un carácter especial");

    return errores.length > 0 ? "Necesita: " + errores.join(", ") : "";
  };

  const passwordsIguales = (p1, p2) => p1 === p2;

  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "usuario":
        if (campoVacio(value)) error = "Campo obligatorio";
        else if (value.length < 3) error = "Mínimo 3 caracteres";
        break;
      case "email":
        error = obtenerErrorEmail(value);
        break;
      case "password":
        error = obtenerErrorPassword(value);
        break;
      case "confirmPassword":
        if (!passwordsIguales(form.password, value))
          error = "Las contraseñas no coinciden";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    validateField(id, value);
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
      if (errors[key]) newErrors[key] = errors[key];
    });

    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage("");
      return;
    }

    setMessage("Registro exitoso. ¡Bienvenido!");
    setForm(initialForm);
    setErrors({});
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <section className="registro">
      <div className="container">
        <h2>Registro</h2>
        <button onClick={() => setIsModalOpen(true)}>Abrir formulario</button>
      </div>

      <div className="modal" style={{ display: isModalOpen ? "flex" : "none" }}>
        <div className="modal-contenido">
          <span onClick={() => setIsModalOpen(false)}>&times;</span>

          <h4>Registro</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="usuario"
              placeholder="Usuario"
              value={form.usuario}
              onChange={handleChange}
              className={errors.usuario ? "input-error" : "input-ok"}
            />
            <small className="error">{errors.usuario}</small>

            <input
              type="email"
              id="email"
              placeholder="Correo"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : "input-ok"}
            />
            <small className="error">{errors.email}</small>

            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : "input-ok"}
            />
            <button type="button" onClick={() => togglePassword("password")}>Mostrar</button>
            <small className="error">{errors.password}</small>

            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : "input-ok"}
            />
            <button type="button" onClick={() => togglePassword("confirmPassword")}>Mostrar</button>
            <small className="error">{errors.confirmPassword}</small>

            <button type="submit">Registrarse</button>
            <p>{message}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
