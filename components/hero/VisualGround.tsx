"use client";

import { useMemo, useEffect } from "react";
import * as THREE from "three";

const SIZE = 48;
const AO_SIZE = 2.2;
const AO_MAP = 128;

// Tight, soft dark falloff centred under the ball — sells contact with the
// turf in the photo without covering it with a fake-looking patch.
function createContactAO(): THREE.DataTexture {
  const data = new Uint8Array(AO_MAP * AO_MAP * 4);
  for (let y = 0; y < AO_MAP; y++) {
    for (let x = 0; x < AO_MAP; x++) {
      const dx = (x + 0.5) / AO_MAP - 0.5;
      const dy = (y + 0.5) / AO_MAP - 0.5;
      const d = Math.sqrt(dx * dx + dy * dy) * 2;
      const a = Math.max(0, 1 - d) ** 2.2;
      const i = (y * AO_MAP + x) * 4;
      data[i] = 4; data[i + 1] = 10; data[i + 2] = 2;
      data[i + 3] = Math.round(255 * a * 0.4);
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
      {/* Invisible except for the ball's cast shadow — the photographic
          backdrop supplies the actual grass, real and already lit correctly. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[SIZE, SIZE]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

      {/* Small, soft contact AO right under the ball. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[AO_SIZE, AO_SIZE]} />
        <meshBasicMaterial map={aoMap} transparent depthWrite={false} />
      </mesh>
    </>
  );
}
