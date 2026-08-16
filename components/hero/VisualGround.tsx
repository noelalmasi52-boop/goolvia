"use client";

import { MeshReflectorMaterial } from "@react-three/drei";

export default function VisualGround() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[80, 80]} />
      <MeshReflectorMaterial
        blur={[512, 128]}
        resolution={1024}
        mixBlur={1.0}
        mixStrength={60}
        roughness={0.9}
        depthScale={1.2}
        minDepthThreshold={0.3}
        maxDepthThreshold={1.4}
        // Neutral near-black so the floor reads as a continuation of the
        // photo's pitch rather than a separate navy slab. Low metalness keeps
        // point lights from burning coloured hotspots into the reflection.
        color="#0a0d12"
        metalness={0.2}
        mirror={0}
      />
    </mesh>
  );
}
