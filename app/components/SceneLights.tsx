"use client";

export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.06} />
      <spotLight
        position={[0, 9, 3]}
        angle={0.55}
        penumbra={1}
        intensity={420}
        distance={0}
        decay={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      />
      <spotLight
        position={[-6, 6, 4]}
        angle={0.6}
        penumbra={1}
        intensity={120}
        distance={0}
        decay={2}
        color="#cbd5ff"
      />
      <pointLight position={[0, 2.5, 5]} intensity={12} decay={2} />
    </>
  );
}
