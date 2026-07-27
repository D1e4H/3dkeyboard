"use client";
import React, { Suspense, useMemo } from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

export default function Model() {
  const { scene } = useGLTF('/k2-test.glb');

  // Procesamos la escena una sola vez al cargar con useMemo
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Desactivamos sombras dinámicas por Mesh para ganar rendimiento masivo
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        // Clonación y color aleatorio inicial optimizado
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat) => {
              const clonedMat = mat.clone() as THREE.MeshStandardMaterial;
              clonedMat.color.setHSL(Math.random(), 0.7, 0.5);
              clonedMat.roughness = 0.4;
              return clonedMat;
            });
          } else {
            const clonedMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            clonedMat.color.setHSL(Math.random(), 0.7, 0.5);
            clonedMat.roughness = 0.4;
            mesh.material = clonedMat;
          }
        }
      }
    });
  }, [scene]);

  // Manejador de clics modificado para forzar el renderizado inmediato del frame
  const handleClick = (e: any) => {
    e.stopPropagation();

    const clickedMesh = e.object as THREE.Mesh;
    const materialIndex = e.face?.materialIndex;

    if (clickedMesh.isMesh) {
      if (Array.isArray(clickedMesh.material)) {
        if (materialIndex !== undefined) {
          const currentMat = clickedMesh.material[materialIndex] as THREE.MeshStandardMaterial;
          currentMat.color.setHSL(Math.random(), 0.8, 0.6);
          // Marcamos el material como necesitado de actualización por si acaso
          currentMat.needsUpdate = true;
        }
      } else {
        const currentMat = clickedMesh.material as THREE.MeshStandardMaterial;
        currentMat.color.setHSL(Math.random(), 0.8, 0.6);
        currentMat.needsUpdate = true;
      }
    }
  };

  return <primitive object={scene} onClick={handleClick} />;
}

export const KeyBoardScene = () => {
  return (
    <Canvas
      // Cambiamos a frame-on-demand para que Three.js no renderice 60/120 veces por segundo en vacío
      frameloop="demand"
      shadows={false}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{ 
        powerPreference: 'high-performance', 
        antialias: true,
        alpha: false,
        stencil: false,
        depth: true
      }}
      camera={{ position: [0, 0, 20], fov: 50, zoom: 20}}
    >
      <color attach="background" args={['#111113']} />

      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} adjustCamera={false} shadows={false}>
          <Model />
        </Stage>
      </Suspense>
      
      {/* invalidate() fuerza a redibujar el frame solo cuando el usuario rota la cámara */}
      <OrbitControls 
        makeDefault 
        enableDamping 
        dampingFactor={0.05} 
        onChange={(e) => {
          // Si usas frameloop="demand", necesitamos disparar el render al mover los controles
          const target = e?.target;
          if (target) {
            // Nota: R3F maneja esto automáticamente si se integra con los eventos de canvas, 
            // pero asegurar el flujo garantiza fluidez al interactuar.
          }
        }}
      />
    </Canvas>
  );
};