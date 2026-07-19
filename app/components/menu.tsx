"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

import { ChromePicker } from "react-color";

export default function Menu() {
  const menuRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("baseColor");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Estado para el color seleccionado

  // Animación de entrada al montar el componente
  useLayoutEffect(() => {
    gsap.fromTo(
      menuRef.current,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  const categories = [
    { id: "baseColor", label: "Color Base" },
    { id: "keycapColor", label: "Color Keycaps" },
    { id: "keycapType", label: "Tipo de Keycap" },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute left-0 top-0 h-screen w-60 md:w-80 bg-stone-900/90 backdrop-blur-lg p-8 z-50 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] border-r border-stone-800"
    >
      <h2 className="text-white text-2xl font-bold mb-8 tracking-tight">
        CONFIG SHARKOON
      </h2>

      {/* Navegación de categorías */}
      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`cursor-pointer px-4 py-3  text-left transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-stone-100 text-stone-900 font-semibold"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Espacio para controles dinámicos */}
      <div className="mt-auto pt-8 border-t border-stone-800">
        <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">
          {activeCategory.replace(/([A-Z])/g, " $1")}
        </p>
        <div className="mt-4 h-32 flex items-center justify-center border-2  border-stone-800 ">
          <span className="text-stone-600 text-sm italic">
            Controles de {activeCategory} aquí
            <div className="mt-10 flex justify-center">
              <ChromePicker
                color={selectedColor} // El estado actual que manejes
                onChange={(color) => {
                  // Aquí actualizas tu estado en el store de Zustand
                  setSelectedColor(color.hex);
                }}
                disableAlpha={true} // Ponlo en false si quieres permitir transparencia
                styles={{
                  default: {
                    picker: {
                      background: "#1c1917", // Fondo oscuro a juego con tu menú
                      boxShadow: "none",
                      borderRadius: "16px",
                    },
                  },
                }}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
