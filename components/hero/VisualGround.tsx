"use client";

import { useMemo, useEffect } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

const SIZE = 48; // world units — the floor is a pool, not an infinite plane
const MAP = 128;

/**
 * Radial alpha map: opaque under the ball, fully transparent by the edge.
 *
 * Without this the floor is a solid slab whose far edge cuts a hard horizon
 * across the frame and hides most of the stadium photo behind it. Fading it
 * out lets the backdrop read across the whole hero while keeping the
 * reflection under the ball.
 *
 * Built as a DataTexture rather than a canvas so it works during SSR.
 */
function createFadeMap(): THREE.DataTexture {
  const data = new Uint8Array(MAP * MAP * 4);

  for (let y = 0; y < MAP; y++) {
    for (let x = 0; x < MAP; x++) {
      const dx = (x + 0.5) / MAP - 0.5;
      const dy = (y + 0.5) / MAP - 0.5;
      // 0 at centre, 1.0 at the edge mid-side
      const d = Math.sqrt(dx * dx + dy * dy) * 2;

      // smoothstep(0.30, 0.80, d), inverted
      const t = Math.min(Math.max((d - 0.3) / 0.5, 0), 1);
      const a = 1 - t * t * (3 - 2 * t);

      const v = Math.round(255 * a);
      const i = (y * MAP + x) * 4;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = v;
    }
  }

  const tex = new THREE.DataTexture(data, MAP, MAP, THREE.RGBAFormat);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export default function VisualGround() {
  const fadeMap = useMemo(() => createFadeMap(), []);
  useEffect(() => () => fadeMap.dispose(), [fadeMap]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[SIZE, SIZE]} />
      <MeshReflectorMaterial
        blur={[512, 128]}
        resolution={1024}
        mixBlur={1.0}
        mixStrength={60}
        roughness={0.9}
        depthScale={1.2}
        minDepthThreshold={0.3}
        maxDepthThreshold={1.4}
        color="#0a0d12"
        metalness={0.2}
        mirror={0}
        transparent
        alphaMap={fadeMap}
      />
    </mesh>
  );
}
