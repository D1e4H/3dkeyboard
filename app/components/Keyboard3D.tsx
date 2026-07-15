"use client";

import { useMemo } from "react";

const ROWS = 5;
const COLS = 14;
const KEY_SIZE = 0.9;
const KEY_GAP = 0.12;
const STEP = KEY_SIZE + KEY_GAP;

type KeyData = {
  key: string;
  position: [number, number, number];
};

function buildKeys(): KeyData[] {
  const keys: KeyData[] = [];
  const offsetX = ((COLS - 1) * STEP) / 2;
  const offsetZ = ((ROWS - 1) * STEP) / 2;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      keys.push({
        key: `${row}-${col}`,
        position: [col * STEP - offsetX, 0.25, row * STEP - offsetZ],
      });
    }
  }
  return keys;
}

export default function Keyboard3D() {
  const keys = useMemo(() => buildKeys(), []);

  const baseWidth = COLS * STEP + 0.5;
  const baseDepth = ROWS * STEP + 0.5;

  return (
    <group position={[0, 0.4, 0]} rotation={[0.06, 0, 0]}>
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[baseWidth, 0.5, baseDepth]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.35} metalness={0.25} />
      </mesh>

      {keys.map((k) => (
        <mesh key={k.key} position={k.position} castShadow receiveShadow>
          <boxGeometry args={[KEY_SIZE, 0.45, KEY_SIZE]} />
          <meshStandardMaterial
            color="#f5f5f5"
            roughness={0.6}
            metalness={0.02}
          />
        </mesh>
      ))}
    </group>
  );
}
