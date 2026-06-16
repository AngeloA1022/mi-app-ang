import React, { useState, useEffect } from "react";

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(1); // 1: Normal, 2: Grande, 3: Extra
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTextSize = localStorage.getItem("acc-text-size");
    const savedContrast = localStorage.getItem("acc-contrast") === "true";
    const savedDarkMode = localStorage.getItem("acc-dark-mode") === "true";

    if (savedTextSize) setTextSize(parseInt(savedTextSize, 10));
    if (savedContrast) setHighContrast(savedContrast);
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // 1. Tamaño del texto
    if (textSize === 2) document.body.style.fontSize = "120%";
    else if (textSize === 3) document.body.style.fontSize = "140%";
    else document.body.style.fontSize = "100%";
    localStorage.setItem("acc-text-size", textSize);

    // 2. Alto contraste
    if (highContrast) document.body.classList.add("high-contrast");
    else document.body.classList.remove("high-contrast");
    localStorage.setItem("acc-contrast", highContrast);

    // 3. Modo Oscuro
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    localStorage.setItem("acc-dark-mode", darkMode);
  }, [textSize, highContrast, darkMode]);

  return (
    <div className="accessibility-wrapper">
      <button
        id="btn-accesibilidad"
        className={`accessibility-btn ${isOpen ? 'active' : ''}`}
        aria-label="Opciones de accesibilidad"
        aria-expanded={isOpen}
        aria-controls="menu-accesibilidad"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span aria-hidden="true">♿</span>
        <span className="btn-text">Accesibilidad</span>
      </button>

      <div
        id="menu-accesibilidad"
        className="accessibility-menu"
        hidden={!isOpen}
        role="region"
        aria-labelledby="btn-accesibilidad"
      >
        <h4>Accesibilidad</h4>
        <ul>
          <li>
            <button onClick={() => setTextSize(prev => prev >= 3 ? 1 : prev + 1)}>
              Texto: {textSize === 1 ? "Normal" : textSize === 2 ? "Grande" : "Extra"}
            </button>
          </li>
          <li>
            <button onClick={() => setHighContrast(!highContrast)} className={highContrast ? "active-opt" : ""}>
              Contraste: {highContrast ? "SÍ" : "NO"}
            </button>
          </li>
          <li>
            <button onClick={() => setDarkMode(!darkMode)} className={darkMode ? "active-opt" : ""}>
              Modo Oscuro: {darkMode ? "ON" : "OFF"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}