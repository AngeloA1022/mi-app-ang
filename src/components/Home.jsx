import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bienvinido los Espartanos</h1>
      <p>Hola mi primera pagina.</p>
      <Link to="/contacto">Ir a Contacto</Link>
    </div>
  );
}
