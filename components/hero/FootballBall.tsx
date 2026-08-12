"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const BALL_RADIUS = 0.56;

const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: [number, number, number][] = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
];

type Frame = { v: [number, number, number]; t: [number, number, number]; b: [number, number, number] };

function buildFrames(): Frame[] {
  return RAW_VERTS.map(([x, y, z]) => {
    const l = Math.sqrt(x * x + y * y + z * z);
    const v: [number, number, number] = [x / l, y / l, z / l];
    const ref: [number, number, number] = Math.abs(v[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    let t: [number, number, number] = [
      v[1] * ref[2] - v[2] * ref[1],
      v[2] * ref[0] - v[0] * ref[2],
      v[0] * ref[1] - v[1] * ref[0],
    ];
    const tl = Math.hypot(t[0], t[1], t[2]);
    t = [t[0] / tl, t[1] / tl, t[2] / tl];
    const b: [number, number, number] = [
      v[1] * t[2] - v[2] * t[1],
      v[2] * t[0] - v[0] * t[2],
      v[0] * t[1] - v[1] * t[0],
    ];
    return { v, t, b };
  });
}

const STAR_OUT = 0.50;
const STAR_IN = 0.205;
const SEG = (Math.PI * 2) / 5;
const HALF_SEG = SEG / 2;
const SIN_HALF = Math.sin(HALF_SEG);
const GOLD_W = 0.032;

function starRadius(phi: number): number {
  let psi = phi % SEG;
  if (psi < 0) psi += SEG;
  const u = psi < HALF_SEG ? psi : SEG - psi;
  return (STAR_OUT * STAR_IN * SIN_HALF) / (STAR_OUT * Math.sin(u) + STAR_IN * Math.sin(HALF_SEG - u));
}

function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function createUCLTexture(): THREE.CanvasTexture {
  const size = 1400;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const frames = buildFrames();

  const img = ctx.createImageData(size, size);
  const d = img.data;
  const TAU = Math.PI * 2;

  for (let py = 0; py < size; py++) {
    const lat = (py / size) * Math.PI;
    const sy = Math.sin(lat);
    const cy = Math.cos(lat);

    for (let px = 0; px < size; px++) {
      const lon = (px / size) * TAU - Math.PI;
      const nx = sy * Math.cos(lon);
      const ny = cy;
      const nz = sy * Math.sin(lon);

      let best = -2, second = -2, bestIdx = 0;
      for (let i = 0; i < 12; i++) {
        const v = frames[i].v;
        const dot = nx * v[0] + ny * v[1] + nz * v[2];
        if (dot > best) { second = best; best = dot; bestIdx = i; }
        else if (dot > second) { second = dot; }
      }

      const f = frames[bestIdx];
      const ang = Math.acos(Math.min(1, Math.max(-1, best)));

      const px3 = nx - best * f.v[0];
      const py3 = ny - best * f.v[1];
      const pz3 = nz - best * f.v[2];
      const phi = Math.atan2(
        px3 * f.b[0] + py3 * f.b[1] + pz3 * f.b[2],
        px3 * f.t[0] + py3 * f.t[1] + pz3 * f.t[2]
      );

      const edge = starRadius(phi);
      const panelSeam = best - second;
      const i4 = (py * size + px) * 4;

      let r: number, g: number, b: number;

      if (ang < edge) {
        // Blue star field
        const depth = ang / edge;
        r = 26 + depth * 22;
        g = 138 + depth * 30;
        b = 210 + depth * 24;

        // White speckle stars scattered on blue
        const h = hash(Math.floor(px * 0.9), Math.floor(py * 0.9));
        if (h > 0.988) {
          const bright = (h - 0.988) / 0.012;
          r += (250 - r) * bright;
          g += (252 - g) * bright;
          b += (255 - b) * bright;
        }

        // Navy pooling toward the star tips
        if (depth > 0.62) {
          const nvy = Math.min(1, (depth - 0.62) / 0.38);
          r = r + (18 - r) * nvy * 0.72;
          g = g + (34 - g) * nvy * 0.72;
          b = b + (86 - b) * nvy * 0.72;
        }

      } else if (ang < edge + GOLD_W) {
        // Gold rim tracing the star
        const t = (ang - edge) / GOLD_W;
        const glow = 1 - Math.abs(t - 0.45) * 1.6;
        r = 186 + glow * 62;
        g = 148 + glow * 58;
        b = 52 + glow * 40;

      } else if (panelSeam < 0.028) {
        // Faint stitch line between panels
        const t = panelSeam / 0.028;
        const k = 0.55 + t * 0.45;
        r = 214 * k + 30;
        g = 218 * k + 30;
        b = 226 * k + 30;

      } else {
        // White leather panel with soft shading
        const grain = hash(Math.floor(px * 0.35), Math.floor(py * 0.35)) * 5;
        r = 242 + grain;
        g = 244 + grain;
        b = 249 + grain;
      }

      d[i4] = Math.round(Math.min(255, Math.max(0, r)));
      d[i4 + 1] = Math.round(Math.min(255, Math.max(0, g)));
      d[i4 + 2] = Math.round(Math.min(255, Math.max(0, b)));
      d[i4 + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createRoughnessMap(): THREE.CanvasTexture {
  const size = 700;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const frames = buildFrames();

  const img = ctx.createImageData(size, size);
  const d = img.data;
  const TAU = Math.PI * 2;

  for (let py = 0; py < size; py++) {
    const lat = (py / size) * Math.PI;
    const sy = Math.sin(lat);
    const cy = Math.cos(lat);

    for (let px = 0; px < size; px++) {
      const lon = (px / size) * TAU - Math.PI;
      const nx = sy * Math.cos(lon);
      const ny = cy;
      const nz = sy * Math.sin(lon);

      let best = -2, second = -2, bestIdx = 0;
      for (let i = 0; i < 12; i++) {
        const v = frames[i].v;
        const dot = nx * v[0] + ny * v[1] + nz * v[2];
        if (dot > best) { second = best; best = dot; bestIdx = i; }
        else if (dot > second) { second = dot; }
      }

      const f = frames[bestIdx];
      const ang = Math.acos(Math.min(1, Math.max(-1, best)));
      const px3 = nx - best * f.v[0];
      const py3 = ny - best * f.v[1];
      const pz3 = nz - best * f.v[2];
      const phi = Math.atan2(
        px3 * f.b[0] + py3 * f.b[1] + pz3 * f.b[2],
        px3 * f.t[0] + py3 * f.t[1] + pz3 * f.t[2]
      );
      const edge = starRadius(phi);
      const panelSeam = best - second;

      let rough: number;
      if (ang < edge) rough = 118;
      else if (ang < edge + GOLD_W) rough = 74;
      else if (panelSeam < 0.028) rough = 205;
      else rough = 132;

      const i4 = (py * size + px) * 4;
      d[i4] = rough; d[i4 + 1] = rough; d[i4 + 2] = rough; d[i4 + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

export default function FootballBall({ scrollProgress }: { scrollProgress: number }) {
  const rbRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [bodyType, setBodyType] = useState<"dynamic" | "kinematicPosition">("dynamic");
  const settled = useRef(false);

  const colorMap = useMemo(() => createUCLTexture(), []);
  const roughMap = useMemo(() => createRoughnessMap(), []);

  useEffect(() => {
    const t = setTimeout(() => {
      settled.current = true;
      setBodyType("kinematicPosition");
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  useFrame((_, delta) => {
    if (!rbRef.current) return;
    if (settled.current && bodyType === "kinematicPosition") {
      rbRef.current.setNextKinematicTranslation({ x: 0, y: BALL_RADIUS, z: 0 });
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.14;
        meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.04;
      }
    }
  });

  return (
    <RigidBody
      ref={rbRef}
      type={bodyType}
      position={[0, 13, 0]}
      restitution={0.45}
      friction={0.85}
      linearDamping={0.18}
      angularDamping={0.45}
      colliders="ball"
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[BALL_RADIUS, 128, 128]} />
        <meshPhysicalMaterial
          ref={matRef}
          map={colorMap}
          roughnessMap={roughMap}
          roughness={0.5}
          metalness={0.0}
          clearcoat={0.45}
          clearcoatRoughness={0.12}
          envMapIntensity={1.8}
          reflectivity={0.55}
        />
      </mesh>
    </RigidBody>
  );
}
