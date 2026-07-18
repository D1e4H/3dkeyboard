"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


export default function Model() {
  // Aquí importamos el modelo directamente. 
  // No olvides poner el archivo en la carpeta /public
  const { scene } = useGLTF('/keyboard-op.glb');
  
  // primitive es la forma de renderizar un modelo cargado de forma directa
  return <primitive object={scene} />;
}