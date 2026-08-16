"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SceneLighting() {
  const keyRef  = useRef<THREE.SpotLight>(null);
  const fill1Ref = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    [keyRef, fill1Ref].forEach((r) => {
      if (!r.current) return;
      r.current.shadow.mapSize.set(2048, 2048);
      r.current.shadow.camera.near = 0.5;
      r.current.shadow.camera.far  = 40;
      r.current.shadow.bias = -0.0008;
      r.current.shadow.camera.updateProjectionMatrix();
    });
  }, []);

  return (
    <>
      {/* Very dim ambient — let spotlights do the drama */}
      <ambientLight intensity={0.08} color="#c8d8ff" />

      {/* Stadium sky — faint blue-white from above */}
      <hemisphereLight args={["#d0e4ff", "#080c10", 0.4]} />

      {/* KEY — harsh white stadium floodlight from high above-right */}
      <spotLight
        ref={keyRef}
        position={[4, 18, 6]}
        angle={0.22}
        penumbra={0.35}
        intensity={320}
        color="#fff8f0"
        castShadow
      />

      {/* Second floodlight from upper-left — classic twin-light stadium look */}
      <spotLight
        ref={fill1Ref}
        position={[-6, 16, 5]}
        angle={0.28}
        penumbra={0.55}
        intensity={140}
        color="#e8f4ff"
        castShadow={false}
      />

      {/* Cool blue rim from behind-right */}
      <spotLight
        position={[5, 10, -6]}
        angle={0.3}
        penumbra={0.8}
        intensity={60}
        color="#a8c8ff"
        castShadow={false}
      />

      {/* Warm amber from behind — subtle rim light */}
      <pointLight
        position={[0, 3, -7]}
        intensity={22}
        color="#6a3810"
        distance={16}
        decay={2}
      />

      {/* Dedicated ball light — strong from above the resting spot */}
      <pointLight
        position={[0, 5, 1]}
        intensity={48}
        color="#ffffff"
        distance={9}
        decay={2}
      />

      {/* Ground glow — faint blue underneath */}
      <pointLight
        position={[0, 0.2, 0.5]}
        intensity={5}
        color="#2244aa"
        distance={5}
        decay={2}
      />
    </>
  );
}
