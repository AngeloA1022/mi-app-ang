import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Bienvenida from "./components/Bienvenida";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import Registro from "./components/Registro";
import Login from "./components/Login";
import Personajes from "./components/Personajes";
import CrudPokemon from "./components/Crud_Personajes";
import Mapas from "./components/Mapas";
import Objetos from "./components/Objetos";
import Consejos from "./components/Consejos";
import Accesibilidad from "./components/Accesibilidad";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Bienvenida />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/consejos" element={<Consejos />} />

        {/* 🟢 Vista de personajes (solo lectura) */}
        <Route path="/personajes" element={<Personajes />} />

        <Route path="/mapas" element={<Mapas />} />

          <Route path="/objetos" element={<Objetos />} />

        <Route path="/accesibilidad" element={<Accesibilidad />} />

        {/* 🟢 CRUD de Pokémon */}
        <Route path="/crud" element={<CrudPokemon />} />

        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />

        {/* 🔴 Ruta por defecto */}
        <Route path="*" element={<Bienvenida />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;