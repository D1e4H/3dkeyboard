"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { KeyBoardScene } from "./model";
import { AnimatedButton } from "./animated/animatedbutton";

export default function HeroSection() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDesingmode, setIsDesingmode] = React.useState(false);
  const handleStartExperience = () => {
    if (overlayRef.current) {
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {

       if (overlayRef.current === null) {return ;} 
       overlayRef.current.style.display = "none";
      },
    });
    setIsDesingmode(true);
  };
}
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
        if (overlayRef.current === null) {return ;}
        overlayRef.current.style.display = "flex";
      },
    });
  };

  return (
    <section className="relative h-screen w-full text-black bg-magenta-500 overflow-hidden">
      {/* Contenedor del Canvas 3D */}
      <div className="absolute inset-0">
        <KeyBoardScene />
      </div>

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
