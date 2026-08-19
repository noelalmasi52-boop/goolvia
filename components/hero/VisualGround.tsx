"use client";

import { useMemo, useEffect } from "react";
import * as THREE from "three";

const SIZE = 48;
const AO_SIZE = 3.4;
const AO_MAP = 128;

// Tight, dark radial falloff centred under the ball — sells contact with the
// turf instead of a flat drop shadow. Layered above the shadow-catcher plane.
function createContactAO(): THREE.DataTexture {
  const data = new Uint8Array(AO_MAP * AO_MAP * 4);
  for (let y = 0; y < AO_MAP; y++) {
    for (let x = 0; x < AO_MAP; x++) {
      const dx = (x + 0.5) / AO_MAP - 0.5;
      const dy = (y + 0.5) / AO_MAP - 0.5;
      const d = Math.sqrt(dx * dx + dy * dy) * 2;
      const a = Math.max(0, 1 - d) ** 1.8;
      const i = (y * AO_MAP + x) * 4;
      data[i] = 6; data[i + 1] = 18; data[i + 2] = 4;
      data[i + 3] = Math.round(255 * a);
    }
  }
  const tex = new THREE.DataTexture(data, AO_MAP, AO_MAP, THREE.RGBAFormat);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export default function VisualGround() {
  const aoMap = useMemo(() => createContactAO(), []);
  useEffect(() => () => aoMap.dispose(), [aoMap]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[SIZE, SIZE]} />
        <shadowMaterial transparent opacity={0.45} />
      </mesh>

      {/* Contact AO decal — sits just above the shadow plane, centred on the
          ball's resting spot (0, 0, 0), so the ball reads as sunk into turf. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[AO_SIZE, AO_SIZE]} />
        <meshBasicMaterial map={aoMap} transparent depthWrite={false} />
      </mesh>
    </>
  );
}
