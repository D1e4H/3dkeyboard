"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { KeyBoardScene } from "./keyBoardScene";
import { AnimatedButton } from "./animated/animatedbutton";
import Menu from "./menu";

export default function HeroSection() {
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDesingmode, setIsDesingmode] = React.useState(false);
  const handleStartExperience = () => {
    // Animación e salida: desvanece y mueve el texto hacia arriba
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        // Opcional: ocultar completamente del flujo si es necesario
        overlayRef.current.style.display = "none";
      },
    });
    setIsDesingmode(true);
  };
  const handleBackToHome = () => {
    gsap.to(buttonRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setIsDesingmode(false);
      },
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        overlayRef.current.style.display = "flex";
      },
    });
  };

  return (
    <section className="relative h-screen w-full text-black bg-stone-300 overflow-hidden">
      {/* Contenedor del Canvas 3D */}
      <div className="absolute inset-0">
        <KeyBoardScene />
      </div>
      {isDesingmode ? (
        <div>
          <button
            ref={buttonRef}
            onClick={handleBackToHome}
            className="bg-none border-2 border-stone-900 fixed z-50 text-5xs font-bold md:text-2xl p-3 mt-5 ml-7 tracking-wider"
          >
            back to home
          </button>
          <Menu></Menu>
        </div>
      ) : null}

      <div
        ref={overlayRef}
        className="relative z-10 flex h-full flex-col justify-between px-6 py-10 md:px-16 md:py-16"
      >
        <div className="w-full">
          <h1 className="text-2xl font-bold md:text-4xl mb-5 tracking-wider">
            NOVA 96
          </h1>
        </div>

        <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="text-3xl font-light md:text-4xl">
            THE ULTIMATE 3D <br className="hidden md:block" /> KEYBOARD
            EXPERIENCE
          </p>

          {/* Pasamos la función al botón */}
          <div onClick={handleStartExperience}>
            <AnimatedButton />
          </div>
        </div>
      </div>
    </section>
  );
}
