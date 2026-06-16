import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);

  const [textSize, setTextSize] = useState(() => {
    const saved = localStorage.getItem("acc-text-size");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("acc-contrast") === "true";
  });

  useEffect(() => {
    // ✅ Tamaños bien definidos
    if (textSize === 2) document.body.style.fontSize = "80%";
    else if (textSize === 3) document.body.style.fontSize = "120%";
    else if (textSize === 4) document.body.style.fontSize = "140%";
    else document.body.style.fontSize = "100%";

    localStorage.setItem("acc-text-size", textSize);

    // ✅ Contraste
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("acc-contrast", highContrast);

  }, [textSize, highContrast]);

  return (
    <div className="accessibility-wrapper">
      <button
        className="accessibility-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        ♿ Accesibilidad
      </button>

      <div className="accessibility-menu" hidden={!isOpen}>
        <h3>Accesibilidad</h3>
        <ul>

          <li>
            <button onClick={() => setTextSize(prev => prev >= 4 ? 1 : prev + 1)}>
              Texto: {
                textSize === 1 ? "Normal (100%)" :
                textSize === 2 ? "Reducido (80%)" :
                textSize === 3 ? "Grande (120%)" :
                "Extra grande (140%)"
              }
            </button>
          </li>

          <li>
            <button onClick={() => setHighContrast(!highContrast)}>
              Contraste: {highContrast ? "SÍ" : "NO"}
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
}