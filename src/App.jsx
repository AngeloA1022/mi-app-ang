import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Bienvenida from "./components/Bienvenida";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Bienvenida />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
