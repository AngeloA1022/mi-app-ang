import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Bienvenida from "./components/Bienvenida";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import Registro from "./components/Registro";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Bienvenida />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
