import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    asunto: "",
    mensaje: ""
  });

  const [errores, setErrores] = useState({});
  const [mensajeFinal, setMensajeFinal] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mensaje" && value.length > 200) return;

    setForm({
      ...form,
      [name]: value
    });

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ""
      });
    }
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (!form.asunto.trim()) {
      nuevosErrores.asunto = "El asunto es obligatorio";
    }
    if (!form.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validar()) {
      setMensajeFinal("Mensaje enviado correctamente ✅");
      setForm({ nombre: "", asunto: "", mensaje: "" });
    } else {
      setMensajeFinal("");
    }
  };

  return (
    <>
      {/* ===================== */}
      {/* SECCIÓN CONTACTO      */}
      {/* ===================== */}
      <section id="contacto">

        {/* INFORMACIÓN */}
        <div className="info">
          <h2>CONTACTO</h2>

          <p><strong>Empresa DobleAA</strong></p>
          <p>Av. Apoquindo 4501, Oficina 702</p>
          <p>+56 2 2987 6543</p>
          <p>Las Condes, Santiago, Chile</p>

          <h3>HORARIOS</h3>
          <p>LUNES - VIERNES: 08:30am - 06:00pm</p>
          <p>SÁBADO: 09:00am - 01:30pm</p>
          <p>DOMINGO: CERRADO</p>
        </div>

        {/* FORMULARIO */}
        <div className="formulario">
          <h3>CONTÁCTANOS</h3>

          <form id="contactoForm" onSubmit={handleSubmit}>

            <label htmlFor="nombre">Nombre Completo *</label>
            <input 
              type="text" 
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <label htmlFor="asunto">Asunto *</label>
            <input 
              type="text" 
              id="asunto"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
            />
            {errores.asunto && <span className="error">{errores.asunto}</span>}

            <label htmlFor="mensaje">Mensaje *</label>
            <textarea 
              id="mensaje" 
              name="mensaje"
              maxLength="200"
              value={form.mensaje}
              onChange={handleChange}
            />
            {errores.mensaje && <span className="error">{errores.mensaje}</span>}

            {/* CONTADOR */}
            <p id="contador">{form.mensaje.length} / 200</p>

            <button type="submit">Enviar</button>

            {mensajeFinal && <p id="mensajeContacto">{mensajeFinal}</p>}

          </form>
        </div> {/* Cierre correcto de "formulario" */}

      </section> {/* Cierre de la sección "contacto" */}


        {/* ENLACE */}
        <section>
          <div className="enlaces">
            <h2>Navegación</h2>
            <Link to="/">Volver a Inicio</Link>
          </div>
        </section>
    </>
  );
}