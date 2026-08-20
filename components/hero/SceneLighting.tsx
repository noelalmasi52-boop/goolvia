"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function SceneLighting() {
  const keyRef  = useRef<THREE.SpotLight>(null);
  const fill1Ref = useRef<THREE.SpotLight>(null);

  // The grass-bounce fill only makes sense once the ball is resting on the
  // turf. While it's still falling/bouncing it passes through the light's
  // radius, throwing a distracting yellow-green flash across it.
  const [ballSettled, setBallSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBallSettled(true), 4300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const mapSize = isMobile ? 1024 : 2048;
    [keyRef, fill1Ref].forEach((r) => {
      if (!r.current) return;
      r.current.shadow.mapSize.set(mapSize, mapSize);
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

      {/* Dedicated ball light — strong from above the resting spot.
          Kept neutral white: coloured lights sitting near the floor threw
          tinted hotspots into the reflection under the ball. */}
      <pointLight
        position={[0, 5, 1]}
        intensity={48}
        color="#ffffff"
        distance={9}
        decay={2}
      />

      {/* Grass bounce — dim green fill low to the ground so the ball's
          underside reads as sitting in turf, not floating over it.
          Only enabled once the ball has settled, so it never flashes
          across it during the fall/bounce. */}
      {ballSettled && (
        <pointLight
          position={[0, 0.3, 0.4]}
          intensity={1.6}
          color="#3a6b1e"
          distance={1.4}
          decay={2}
        />
      )}
    </>
  );
}
