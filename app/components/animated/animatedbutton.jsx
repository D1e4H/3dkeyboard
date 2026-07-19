"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const AnimatedButton = ({ text = "Design" }) => {
  const buttonRef = useRef(null);
  
  // Dividimos el texto en letras individuales
  const letters = text.split("");

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(".letter", {
      y: "-100%",
      duration: 0.4,
      ease: "power2.in", // Aceleración inicial
      stagger: 0.05,     // El efecto stagger que pediste
    })
    .set(".letter", { y: "100%" }) // Teletransporte instantáneo al fondo
    .to(".letter", {
      y: "0%",
      duration: 0.4,
      ease: "power2.out", // Desaceleración final
      stagger: 0.05,
    });

    // Eventos de hover
    const btn = buttonRef.current;
    btn.addEventListener("mouseenter", () => tl.play(0)); // .play(0) reinicia siempre al inicio
  }, { scope: buttonRef });

  return (
    <button
      ref={buttonRef}
      className="relative flex items-center px-8 h-14  bg-none border-stone-900 border-2 font-bold text-stone-800  transition-colors"
    >
      <div className="flex relative h-auto w-auto overflow-hidden">
        {letters.map((char, i) => (
          <span key={i} className="letter overflow-hidden w-auto h-auto inline-block relative">
            {char}
          </span>
        ))}
      </div>
    </button>
  );
};