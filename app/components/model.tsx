"use client";
import React, {
  Suspense,
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Color from "./color";

interface ColorContextType {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType>({
  selectedColor: "#ff5733",
  setSelectedColor: () => {},
});

interface HistoryStep {
  material: THREE.MeshStandardMaterial;
  prevColor: string;
  newColor: string;
}

export default function Model() {
  const { scene } = useGLTF("/k2-test.glb");
  const { selectedColor } = useContext(ColorContext);

  // Pilas para historial (Undo / Redo)
  const undoStackRef = useRef<HistoryStep[]>([]);
  const redoStackRef = useRef<HistoryStep[]>([]);

  // Efecto para escuchar Ctrl + Z y Ctrl + Y / Ctrl + Shift + Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // DESHACER: Ctrl + Z (sin Shift)
      if (isCmdOrCtrl && key === "z" && !e.shiftKey) {
        e.preventDefault();
        const lastAction = undoStackRef.current.pop();
        if (lastAction) {
          lastAction.material.color.set(lastAction.prevColor);
          redoStackRef.current.push(lastAction);
        }
      }

      // REHACER: Ctrl + Y  O  Ctrl + Shift + Z
      if (
        (isCmdOrCtrl && key === "y") ||
        (isCmdOrCtrl && e.shiftKey && key === "z")
      ) {
        e.preventDefault();
        const nextAction = redoStackRef.current.pop();
        if (nextAction) {
          nextAction.material.color.set(nextAction.newColor);
          undoStackRef.current.push(nextAction);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true; // No renderiza lo que no está en pantalla

        if (mesh.material) {
          const setupMaterial = (mat: THREE.Material) => {
            if (
              mat instanceof THREE.MeshStandardMaterial ||
              mat instanceof THREE.MeshPhysicalMaterial
            ) {
              mat.roughness = 0.7;
              mat.metalness = 0.1;
              mat.needsUpdate = false; // Evita recálculos innecesarios por frame
            }
          };

          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat) => {
              const clonedMat = mat.clone();
              setupMaterial(clonedMat);
              if (clonedMat instanceof THREE.MeshStandardMaterial) {
                clonedMat.color.setHSL(Math.random(), 0.7, 0.5);
              }
              return clonedMat;
            });
          } else {
            const clonedMat = mesh.material.clone();
            setupMaterial(clonedMat);
            if (clonedMat instanceof THREE.MeshStandardMaterial) {
              clonedMat.color.setHSL(Math.random(), 0.7, 0.5);
            }
            mesh.material = clonedMat;
          }
        }
      }
    });
  }, [scene]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    const clickedMesh = e.object as THREE.Mesh;
    const materialIndex = e.face?.materialIndex;

    if (clickedMesh.isMesh) {
      let materialToChange: THREE.Material | undefined;
      if (Array.isArray(clickedMesh.material) && materialIndex !== undefined) {
        materialToChange = clickedMesh.material[materialIndex];
      } else {
        materialToChange = clickedMesh.material as THREE.Material;
      }

      if (materialToChange instanceof THREE.MeshStandardMaterial) {
        const prevColor = "#" + materialToChange.color.getHexString();

        // Solo registramos si el color es diferente al actual
        if (prevColor !== selectedColor) {
          undoStackRef.current.push({
            material: materialToChange,
            prevColor: prevColor,
            newColor: selectedColor,
          });

          // Al hacer una nueva acción, limpiamos el historial de rehacer
          redoStackRef.current = [];

          materialToChange.color.set(selectedColor);
        }
      }
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <primitive
      object={scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

// Precargamos el modelo para evitar bloqueos repentinos
useGLTF.preload("/k2-test.glb");

export const KeyBoardScene = () => {
  const [selectedColor, setSelectedColor] = useState("#ff5733");

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      <style jsx global>{`
        .bg-gradient-size {
          background-size: 400% 400%;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
        }
        input[type="color"] {
          border: none;
          box-sizing: content-box;
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#111113",
        }}
      >
        {/* Panel flotante */}
        <Color
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
        />

        {/* Escena 3D optimizada */}
        <Canvas
          shadows={false}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            alpha: false,
            stencil: false,
            depth: true,
          }}
          camera={{ position: [13.38, 12.24, 8.43], fov: 50, zoom: 55 }}
        >
          <color attach="background" args={["#111113"]} />
          <Suspense fallback={null}>
            <Stage
              environment="city"
              intensity={0.25}
              adjustCamera={false}
              shadows={false}
            >
              <Model />
            </Stage>
          </Suspense>

          <OrbitControls
            enablePan={false}
            makeDefault
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </ColorContext.Provider>
  );
};
