"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Model from "./model";

export  function KeyboardScene() {
  return (
    <div className="w-full h-[600px]">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        {/* Suspense muestra algo mientras el modelo carga */}
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
        </Suspense>
        
        <OrbitControls makeDefault autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}