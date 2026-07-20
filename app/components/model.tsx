"use client";
import React, {Suspense} from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";


export default function Model() {
  const { scene } = useGLTF('/keyboard-op.glb');
  
  return <primitive object={scene} />;
}

export const KeyBoardScene = () => {
  return (
      <Canvas  shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 50 }}>
          <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
        </Suspense>
        
        <OrbitControls makeDefault />
      </Canvas>
  );
}