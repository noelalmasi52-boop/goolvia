"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SceneLighting() {
  const keyLightRef = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    if (!keyLightRef.current) return;
    const light = keyLightRef.current;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 40;
    light.shadow.bias = -0.0008;
    light.shadow.camera.updateProjectionMatrix();
  }, []);

  return (
    <>
      {/* Stadium sky — blue-white from above, warm from ground */}
      <hemisphereLight
        args={["#b8d4f0", "#2a3a1a", 0.9]}
      />

      {/* Warm ambient fill */}
      <ambientLight intensity={0.35} color="#c8d8f0" />

      {/* Key light — harsh warm flood from above-right */}
      <spotLight
        ref={keyLightRef}
        position={[3, 14, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={200}
        color="#fff6e8"
        castShadow
      />

      {/* Fill — cool blue from left, simulates stadium floodlight */}
      <spotLight
        position={[-5, 12, 4]}
        angle={0.4}
        penumbra={0.9}
        intensity={80}
        color="#d0e8ff"
        castShadow={false}
      />

      {/* Second fill from right */}
      <spotLight
        position={[6, 10, -2]}
        angle={0.35}
        penumbra={0.8}
        intensity={50}
        color="#e8f4ff"
        castShadow={false}
      />

      {/* Rim — warm orange from behind */}
      <pointLight
        position={[0, 2, -8]}
        intensity={18}
        color="#7a4820"
        distance={18}
        decay={2}
      />

      {/* Ground bounce */}
      <pointLight
        position={[0, 0.3, 2]}
        intensity={4}
        color="#4a5820"
        distance={8}
        decay={2}
      />

      {/* Dedicated ball light — directly above resting position */}
      <pointLight
        position={[0, 4, 1]}
        intensity={35}
        color="#ffffff"
        distance={10}
        decay={2}
      />
    </>
  );
}
