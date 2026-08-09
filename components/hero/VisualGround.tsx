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
        roughness={0.85}
        depthScale={1.2}
        minDepthThreshold={0.3}
        maxDepthThreshold={1.4}
        color="#141c28"
        metalness={0.6}
        mirror={0}
      />
    </mesh>
  );
}
