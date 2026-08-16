"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const BALL_RADIUS = 0.56;

const PHI = (1 + Math.sqrt(5)) / 2;

type V3 = [number, number, number];

const unit = (v: V3): V3 => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
};
const dot3 = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross3 = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

// 12 icosahedron vertices — centres of the 12 dark pentagons
const ICO: V3[] = ([
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
] as V3[]).map(unit);

type Frame = { v: V3; t: V3; b: V3 };

// Tangent frame with phi=0 pointing at nearest neighbour
function buildFrames(points: V3[], targets: V3[]): Frame[] {
  return points.map((v) => {
    let best = -2, bi = 0;
    for (let i = 0; i < targets.length; i++) {
      const d = dot3(v, targets[i]);
      if (d < 0.999 && d > best) { best = d; bi = i; }
    }
    const tg = targets[bi];
    const t = unit([tg[0] - best * v[0], tg[1] - best * v[1], tg[2] - best * v[2]]);
    return { v, t, b: cross3(v, t) };
  });
}

const SEG = (Math.PI * 2) / 5;   // 72° — 5-fold period
const HALF_SEG = SEG / 2;         // 36° = π/5

// Pentagon circumradius: 91 % of the half-distance between neighbouring ICO vertices
const PENT_R = Math.acos(1 / Math.sqrt(5)) / 2 * 0.91;

// Polar equation for a regular pentagon centred at origin, vertices at phi=0,SEG,2SEG,...
// Returns the max ang (angular distance from centre) that is still inside the pentagon.
function pentagonRadius(phi: number): number {
  let p = ((phi % SEG) + SEG) % SEG; // normalise to [0, SEG)
  // cos(p − HALF_SEG) is always positive for p ∈ [0, SEG)
  return PENT_R * Math.cos(HALF_SEG) / Math.cos(p - HALF_SEG);
}

const GROOVE_W = 0.018;  // seam width along pentagon edge
const SEAM_W   = 0.022;  // seam width between white panels

const TEX = 1024;

type BallMaps = { colorMap: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture; normalMap: THREE.CanvasTexture };

function createBallMaps(): BallMaps {
  const size = TEX;
  const frames = buildFrames(ICO, ICO);

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size; colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d")!;
  const colorImg = colorCtx.createImageData(size, size);
  const cd = colorImg.data;

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size; roughCanvas.height = size;
  const roughCtx = roughCanvas.getContext("2d")!;
  const roughImg = roughCtx.createImageData(size, size);
  const rd = roughImg.data;

  const height = new Float32Array(size * size);
  const TAU = Math.PI * 2;

  for (let py = 0; py < size; py++) {
    const lat = ((py + 0.5) / size) * Math.PI;
    const sy = Math.sin(lat);
    const cy = Math.cos(lat);

    for (let px = 0; px < size; px++) {
      const lon = ((px + 0.5) / size) * TAU - Math.PI;
      const nx = sy * Math.cos(lon);
      const ny = cy;
      const nz = sy * Math.sin(lon);

      // Nearest and second-nearest pentagon centre
      let best = -2, second = -2, bi = 0;
      for (let i = 0; i < 12; i++) {
        const v = frames[i].v;
        const d = nx * v[0] + ny * v[1] + nz * v[2];
        if (d > best) { second = best; best = d; bi = i; }
        else if (d > second) { second = d; }
      }

      const sf = frames[bi];
      const ang = Math.acos(best > 1 ? 1 : best < -1 ? -1 : best);
      const ox = nx - best * sf.v[0];
      const oy = ny - best * sf.v[1];
      const oz = nz - best * sf.v[2];
      const phi = Math.atan2(
        ox * sf.b[0] + oy * sf.b[1] + oz * sf.b[2],
        ox * sf.t[0] + oy * sf.t[1] + oz * sf.t[2],
      );
      const edge = pentagonRadius(phi);

      // Fine leather pebbling sampled in 3D (no pole smearing)
      const peb =
        Math.sin(nx * 192) * Math.sin(ny * 192) * Math.sin(nz * 192) * 0.58 +
        Math.sin(nx * 87 + 1.5) * Math.sin(ny * 87 + 0.7) * Math.sin(nz * 87 + 2.2) * 0.42;

      let r: number, g: number, b: number, rough: number, h: number;

      if (ang < edge) {
        // Classic dark panel — matte black/very dark navy
        const t = ang / edge;
        r = 14 + t * 8  + peb * 2;
        g = 16 + t * 8  + peb * 2;
        b = 22 + t * 10 + peb * 3;
        rough = 108;
        h = 0.20 + peb * 0.26;
      } else {
        // Classic white panel — slightly warm off-white leather
        const grain = peb * 5;
        r = 228 + grain;
        g = 226 + grain;
        b = 220 + grain;
        rough = 145;
        h = peb * 0.55;
      }

      // Grooves along pentagon boundary and between white panels
      const toContour = Math.abs(ang - edge);
      let groove = 0;
      if (toContour < GROOVE_W) groove = 1 - toContour / GROOVE_W;
      if (ang > edge) {
        const seam = best - second;
        if (seam < SEAM_W) {
          const s = 1 - seam / SEAM_W;
          if (s > groove) groove = s;
        }
      }
      if (groove > 0) {
        h -= groove * 1.25;
        const shade = groove * 0.62;
        r *= 1 - shade;
        g *= 1 - shade;
        b *= 1 - shade;
        rough += groove * 52;
      }

      const i4 = (py * size + px) * 4;
      cd[i4]     = r < 0 ? 0 : r > 255 ? 255 : r;
      cd[i4 + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      cd[i4 + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
      cd[i4 + 3] = 255;

      const rv = rough > 255 ? 255 : rough;
      rd[i4] = rv; rd[i4 + 1] = rv; rd[i4 + 2] = rv; rd[i4 + 3] = 255;
      height[py * size + px] = h;
    }
  }

  colorCtx.putImageData(colorImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  // Tangent-space normal map derived from height field
  const normCanvas = document.createElement("canvas");
  normCanvas.width = size; normCanvas.height = size;
  const normCtx = normCanvas.getContext("2d")!;
  const normImg = normCtx.createImageData(size, size);
  const nd = normImg.data;
  const STRENGTH = 2.8;

  for (let py = 0; py < size; py++) {
    const lat = ((py + 0.5) / size) * Math.PI;
    const lonScale = 1 / Math.max(Math.sin(lat), 0.22);
    const rowUp = py > 0 ? py - 1 : py;
    const rowDn = py < size - 1 ? py + 1 : py;

    for (let px = 0; px < size; px++) {
      const left  = px > 0         ? px - 1 : size - 1;
      const right = px < size - 1  ? px + 1 : 0;

      const dhdu = (height[py * size + right] - height[py * size + left]) * 0.5 * lonScale;
      const dhdv = (height[rowDn * size + px]  - height[rowUp * size + px])  * 0.5;

      let vx = -dhdu * STRENGTH;
      let vy =  dhdv * STRENGTH;
      const len = Math.sqrt(vx * vx + vy * vy + 1);
      vx /= len; vy /= len;
      const vz = 1 / len;

      const i4 = (py * size + px) * 4;
      nd[i4]     = (vx * 0.5 + 0.5) * 255;
      nd[i4 + 1] = (vy * 0.5 + 0.5) * 255;
      nd[i4 + 2] = (vz * 0.5 + 0.5) * 255;
      nd[i4 + 3] = 255;
    }
  }
  normCtx.putImageData(normImg, 0, 0);

  const colorMap    = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = 16;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = 8;

  const normalMap    = new THREE.CanvasTexture(normCanvas);
  normalMap.anisotropy = 8;

  return { colorMap, roughnessMap, normalMap };
}

export default function FootballBall({ scrollProgress }: { scrollProgress: number }) {
  const rbRef   = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshPhysicalMaterial>(null);
  const [bodyType, setBodyType] = useState<"dynamic" | "kinematicPosition">("dynamic");
  const settled = useRef(false);

  const { colorMap, roughnessMap, normalMap } = useMemo(() => createBallMaps(), []);

  useEffect(() => {
    return () => { colorMap.dispose(); roughnessMap.dispose(); normalMap.dispose(); };
  }, [colorMap, roughnessMap, normalMap]);

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
        <sphereGeometry args={[BALL_RADIUS, 160, 160]} />
        <meshPhysicalMaterial
          ref={matRef}
          map={colorMap}
          roughnessMap={roughnessMap}
          normalMap={normalMap}
          normalScale={[0.65, 0.65]}
          roughness={1.0}
          metalness={0.0}
          clearcoat={0.45}
          clearcoatRoughness={0.20}
          reflectivity={0.42}
          envMapIntensity={0.9}
        />
      </mesh>
    </RigidBody>
  );
}
