"use client";

import { useMemo, useEffect, useState } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

const SIZE = 48;
const MAP = 128;

function createFadeMap(): THREE.DataTexture {
  const data = new Uint8Array(MAP * MAP * 4);

  for (let y = 0; y < MAP; y++) {
    for (let x = 0; x < MAP; x++) {
      const dx = (x + 0.5) / MAP - 0.5;
      const dy = (y + 0.5) / MAP - 0.5;
      const d = Math.sqrt(dx * dx + dy * dy) * 2;

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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[SIZE, SIZE]} />
      <MeshReflectorMaterial
        blur={isMobile ? [256, 64] : [512, 128]}
        resolution={isMobile ? 512 : 1024}
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
