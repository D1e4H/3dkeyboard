"use client";

const TOP_WIDTH = 22;
const TOP_DEPTH = 11;
const TOP_THICKNESS = 0.5;
const LEG_HEIGHT = 6;
const LEG_SIZE = 0.5;
const LEG_INSET = 1.4;

function Leg({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, -TOP_THICKNESS / 2 - LEG_HEIGHT / 2, z]} castShadow>
      <boxGeometry args={[LEG_SIZE, LEG_HEIGHT, LEG_SIZE]} />
      <meshStandardMaterial color="#1c1917" roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

export default function Table() {
  const legX = TOP_WIDTH / 2 - LEG_INSET;
  const legZ = TOP_DEPTH / 2 - LEG_INSET;

  return (
    <group position={[0, -0.25, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[TOP_WIDTH, TOP_THICKNESS, TOP_DEPTH]} />
        <meshStandardMaterial color="#e7e5e4" roughness={0.35} metalness={0.05} />
      </mesh>
      <Leg x={legX} z={legZ} />
      <Leg x={-legX} z={legZ} />
      <Leg x={legX} z={-legZ} />
      <Leg x={-legX} z={-legZ} />
    </group>
  );
}
