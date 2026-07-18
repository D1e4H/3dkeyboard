"use client";
import React from "react";
import { Canvas, extend} from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import KeyboardScene from "./keyBoardScene";
import * as THREE from "three";


export default function HeroSection() {
  return (
    <section className="relative h-screen w-full text-black bg-stone-300 overflow-hidden">
      {/* Contenedor del Canvas 3D */}
      <div className="absolute inset-0 z-0">
            <KeyboardScene />
      </div>

      {/* Contenido (Overlay) */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 md:px-16 md:py-16">
        {/* Header: NOVA 96 */}
        <div className="w-full">
          <h1 className="text-2xl font-bold md:text-4xl tracking-wider">
            NOVA 96
          </h1>
        </div>

        {/* Footer: Texto y Botón */}
        <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="text-3xl font-light md:text-7xl">
            The Ultimate 3D <br className="hidden md:block" /> Keyboard
            Experience.
          </p>

          <button className="flex h-14 w-32 items-center justify-center rounded-full bg-blue-600 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95">
            Design
          </button>
        </div>
      </div>
    </section>
  );
}
