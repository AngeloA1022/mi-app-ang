import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Contacto from "./components/Contacto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App
