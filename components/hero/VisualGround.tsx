"use client";

import { useMemo, useEffect } from "react";
import * as THREE from "three";

const PATCH_SIZE = 7;
const TEX_SIZE = 256;
const REPEAT = 9;

const AO_SIZE = 3.4;
const AO_MAP = 128;

// Tileable grass color + normal map, generated in canvas so no texture
// download is needed. Layered noise for clumping, plus fine directional
// streaks standing in for individual blades.
function createGrassTextures(): { colorMap: THREE.CanvasTexture; normalMap: THREE.CanvasTexture } {
  const size = TEX_SIZE;
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size; colorCanvas.height = size;
  const cctx = colorCanvas.getContext("2d")!;
  const cimg = cctx.createImageData(size, size);
  const cd = cimg.data;

  const height = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n1 = Math.sin(x * 0.21 + 1.3) * Math.sin(y * 0.24 + 0.7);
      const n2 = Math.sin(x * 0.06 - y * 0.05 + 2.1) * 0.6;
      const n3 = (Math.random() - 0.5) * 0.55;
      const clump = n1 * 0.45 + n2 * 0.35 + n3 * 0.3;

      // Thin diagonal blade streaks, mown-lawn style
      const blade = Math.max(0, Math.sin(x * 1.6 + y * 0.35) * Math.sin(y * 2.0 - x * 0.18));

      const t = (clump + 1) / 2;
      const r = 16 + t * 22 + blade * 4;
      const g = 58 + t * 74 + blade * 22;
      const b = 10 + t * 14 + blade * 4;

      const i4 = (y * size + x) * 4;
      cd[i4]     = Math.min(255, r);
      cd[i4 + 1] = Math.min(255, g);
      cd[i4 + 2] = Math.min(255, b);
      cd[i4 + 3] = 255;

      height[y * size + x] = clump * 0.6 + blade * 0.5;
    }
  }
  cctx.putImageData(cimg, 0, 0);

  // Normal map derived from the height field, for subtle blade bumping
  // under the stadium floodlights.
  const normCanvas = document.createElement("canvas");
  normCanvas.width = size; normCanvas.height = size;
  const nctx = normCanvas.getContext("2d")!;
  const nimg = nctx.createImageData(size, size);
  const nd = nimg.data;
  const STRENGTH = 1.5;

  for (let y = 0; y < size; y++) {
    const up = (y - 1 + size) % size;
    const dn = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const l = (x - 1 + size) % size;
      const rr = (x + 1) % size;
      const dhdu = (height[y * size + rr] - height[y * size + l]) * 0.5;
      const dhdv = (height[dn * size + x] - height[up * size + x]) * 0.5;

      let vx = -dhdu * STRENGTH;
      let vy = -dhdv * STRENGTH;
      const len = Math.sqrt(vx * vx + vy * vy + 1);
      vx /= len; vy /= len;
      const vz = 1 / len;

      const i4 = (y * size + x) * 4;
      nd[i4]     = (vx * 0.5 + 0.5) * 255;
      nd[i4 + 1] = (vy * 0.5 + 0.5) * 255;
      nd[i4 + 2] = (vz * 0.5 + 0.5) * 255;
      nd[i4 + 3] = 255;
    }
  }
  nctx.putImageData(nimg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(REPEAT, REPEAT);
  colorMap.anisotropy = 8;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(REPEAT, REPEAT);

  return { colorMap, normalMap };
}

// Soft radial falloff so the textured patch blends into the photographic
// backdrop instead of showing a hard circular seam.
function createFadeMap(): THREE.DataTexture {
  const data = new Uint8Array(AO_MAP * AO_MAP * 4);
  for (let y = 0; y < AO_MAP; y++) {
    for (let x = 0; x < AO_MAP; x++) {
      const dx = (x + 0.5) / AO_MAP - 0.5;
      const dy = (y + 0.5) / AO_MAP - 0.5;
      const d = Math.sqrt(dx * dx + dy * dy) * 2;
      const t = Math.min(Math.max((d - 0.4) / 0.55, 0), 1);
      const a = 1 - t * t * (3 - 2 * t);
      const v = Math.round(255 * a);
      const i = (y * AO_MAP + x) * 4;
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
      data[i + 3] = v;
    }
  }
  const tex = new THREE.DataTexture(data, AO_MAP, AO_MAP, THREE.RGBAFormat);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

// Tight, dark radial falloff centred under the ball — sells contact with the
// turf instead of a flat drop shadow.
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
      data[i + 3] = Math.round(255 * a * 0.7);
    }
  }
  const tex = new THREE.DataTexture(data, AO_MAP, AO_MAP, THREE.RGBAFormat);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export default function VisualGround() {
  const { colorMap, normalMap } = useMemo(() => createGrassTextures(), []);
  const fadeMap = useMemo(() => createFadeMap(), []);
  const aoMap = useMemo(() => createContactAO(), []);

  useEffect(() => () => {
    colorMap.dispose();
    normalMap.dispose();
    fadeMap.dispose();
    aoMap.dispose();
  }, [colorMap, normalMap, fadeMap, aoMap]);

  return (
    <>
      {/* Textured turf patch under and around the ball — blends into the
          photographic backdrop at its edges via the radial alpha fade. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[PATCH_SIZE, PATCH_SIZE]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={[0.5, 0.5]}
          roughness={0.96}
          metalness={0.0}
          transparent
          alphaMap={fadeMap}
        />
      </mesh>

      {/* Contact AO decal — sits just above, centred on the ball's resting
          spot (0, 0, 0), so the ball reads as sunk into the turf. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[AO_SIZE, AO_SIZE]} />
        <meshBasicMaterial map={aoMap} transparent depthWrite={false} />
      </mesh>
    </>
  );
}
