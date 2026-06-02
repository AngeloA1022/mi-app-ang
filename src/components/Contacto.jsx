import React from "react";
import {Link} from "react-router-dom";

function Contacto() {
  return (
    <div>
      <h1>Contacto</h1>
      <p>Esta es la página de contacto.</p>
      <Link to="/">Volver a Inicio</Link>
    </div>
  );
}
export default Contacto