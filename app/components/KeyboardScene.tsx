"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import SceneLights from "./SceneLights";
import Keyboard3D from "./Keyboard3D";
import Table from "./Table";
import CameraRig from "./CameraRig";

type KeyboardSceneProps = {
  entered: boolean;
};

export default function KeyboardScene({ entered }: KeyboardSceneProps) {
  return (
    <section className="absolute inset-0 bg-[#050505]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 7.5, 17], fov: 42 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 14, 34]} />
        <SceneLights />
        <Table />
        <Keyboard3D />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={24}
          blur={2.6}
          far={5}
          color="#000000"
        />
        <CameraRig entered={entered} />
      </Canvas>
    </section>
  );
}
