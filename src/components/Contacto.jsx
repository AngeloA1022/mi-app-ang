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

return ( <section id="contacto">


  {/* INFO */}
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

    <form onSubmit={handleSubmit}>

      <label>Nombre Completo *</label>
      <input 
        type="text" 
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      <span className="error">{errores.nombre}</span>

      <label>Asunto *</label>
      <input 
        type="text" 
        name="asunto"
        value={form.asunto}
        onChange={handleChange}
      />
      <span className="error">{errores.asunto}</span>

      <label>Mensaje *</label>
      <textarea 
        name="mensaje"
        value={form.mensaje}
        onChange={handleChange}
        maxLength={200}
      />
      <span className="error">{errores.mensaje}</span>

      {/* CONTADOR */}
      <p>{form.mensaje.length} / 200</p>

      <button type="submit">Enviar</button>

      <p>{mensajeFinal}</p>

    </form>


      <Link to="/">Volver a Inicio</Link>


  </div>

</section>


);
}


