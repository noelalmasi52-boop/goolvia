"use client";

const SIZE = 48;

export default function VisualGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[SIZE, SIZE]} />
      <shadowMaterial transparent opacity={0.45} />
    </mesh>
  );
}
