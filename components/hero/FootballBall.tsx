"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const BALL_RADIUS = 0.56;

const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;

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

// 12 icosahedron vertices — the centres of the dark stars
const ICO: V3[] = ([
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
] as V3[]).map(unit);

// 20 dodecahedron vertices — the centres of the white panels. The cyclic
// pattern here is the dual of ICO above; swapping PHI/INV_PHI would land these
// next to the star centres instead of between them.
const DODE: V3[] = ([
  [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
  [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
  [0, PHI, INV_PHI], [0, PHI, -INV_PHI], [0, -PHI, INV_PHI], [0, -PHI, -INV_PHI],
  [INV_PHI, 0, PHI], [INV_PHI, 0, -PHI], [-INV_PHI, 0, PHI], [-INV_PHI, 0, -PHI],
  [PHI, INV_PHI, 0], [PHI, -INV_PHI, 0], [-PHI, INV_PHI, 0], [-PHI, -INV_PHI, 0],
] as V3[]).map(unit);

type Frame = { v: V3; t: V3; b: V3 };

// Build a tangent frame whose phi=0 axis aims at the nearest target point,
// so the five star points line up with the five neighbouring stars.
function buildFrames(points: V3[], targets: V3[]): Frame[] {
  return points.map((v) => {
    let best = -2;
    let bi = 0;
    for (let i = 0; i < targets.length; i++) {
      const d = dot3(v, targets[i]);
      if (d < 0.999 && d > best) { best = d; bi = i; }
    }
    const tg = targets[bi];
    const t = unit([tg[0] - best * v[0], tg[1] - best * v[1], tg[2] - best * v[2]]);
    return { v, t, b: cross3(v, t) };
  });
}

const SEG = (Math.PI * 2) / 5;
const HALF_SEG = SEG / 2;
const SIN_HALF = Math.sin(HALF_SEG);

// Polar equation of a 5-pointed star with straight edges
function starRadius(phi: number, outer: number, inner: number): number {
  let p = phi % SEG;
  if (p < 0) p += SEG;
  const u = p < HALF_SEG ? p : SEG - p;
  return (outer * inner * SIN_HALF) / (outer * Math.sin(u) + inner * Math.sin(HALF_SEG - u));
}

// Half the angle between neighbouring vertices — star tips meet exactly here
const STAR_OUT = Math.acos(1 / Math.sqrt(5)) / 2;
const STAR_IN = STAR_OUT * 0.42;
const RIM_W = 0.021;

const MARK_OUT = 0.155;
const MARK_IN = 0.062;
const MARK_W = 0.013;

// A white panel's centre sits this far from the nearest star centre, so a coral
// mark can only ever fall inside a narrow ring — everything else skips the search.
const PANEL_ANG = Math.acos(dot3(DODE[0], ICO.reduce((a, c) =>
  dot3(DODE[0], c) > dot3(DODE[0], a) ? c : a)));
const MARK_REACH = MARK_OUT + MARK_W;
const MARK_MIN_ANG = PANEL_ANG - MARK_REACH;
const MARK_MAX_ANG = PANEL_ANG + MARK_REACH;

const GROOVE_W = 0.016;
const SEAM_W = 0.020;

const TEX = 1024;
const TEX_MOBILE = 512;

type BallMaps = {
  colorMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
};

function createBallMaps(texSize: number): BallMaps {
  const size = texSize;
  const starFrames = buildFrames(ICO, ICO);
  const markFrames = buildFrames(DODE, ICO);

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

      // Nearest star centre and the runner-up (for panel seams)
      let best = -2, second = -2, bi = 0;
      for (let i = 0; i < 12; i++) {
        const v = starFrames[i].v;
        const d = nx * v[0] + ny * v[1] + nz * v[2];
        if (d > best) { second = best; best = d; bi = i; }
        else if (d > second) { second = d; }
      }

      const sf = starFrames[bi];
      const ang = Math.acos(best > 1 ? 1 : best < -1 ? -1 : best);
      const ox = nx - best * sf.v[0];
      const oy = ny - best * sf.v[1];
      const oz = nz - best * sf.v[2];
      const phi = Math.atan2(
        ox * sf.b[0] + oy * sf.b[1] + oz * sf.b[2],
        ox * sf.t[0] + oy * sf.t[1] + oz * sf.t[2]
      );
      const edge = starRadius(phi, STAR_OUT, STAR_IN);

      // Fine leather pebbling, sampled in 3D so it never smears at the poles
      const peb =
        Math.sin(nx * 212) * Math.sin(ny * 212) * Math.sin(nz * 212) * 0.62 +
        Math.sin(nx * 97 + 1.7) * Math.sin(ny * 97 + 0.9) * Math.sin(nz * 97 + 2.3) * 0.38;

      let r: number, g: number, b: number, rough: number, h: number;

      if (ang < edge - RIM_W) {
        // Dark star panel — glossy, near-black with a cool cast
        const t = ang / edge;
        r = 24 + t * 10;
        g = 27 + t * 11;
        b = 33 + t * 13;
        rough = 68;
        h = 0.26 + peb * 0.30;

      } else if (ang < edge) {
        // Neon green line tracing the star contour
        const t = (ang - (edge - RIM_W)) / RIM_W;
        const fade = 1 - Math.abs(t - 0.5) * 0.7;
        r = 150 * fade + 34;
        g = 214 * fade + 40;
        b = 46 * fade + 30;
        rough = 92;
        h = 0.26 + peb * 0.22;

      } else {
        // White panel — matte, with a small coral star mark at its centre
        const grain = peb * 3.5;
        r = 236 + grain;
        g = 236 + grain;
        b = 231 + grain;
        rough = 148;
        h = peb * 0.5;

        if (ang > MARK_MIN_ANG && ang < MARK_MAX_ANG) {
          let mBest = -2, mi = 0;
          for (let i = 0; i < 20; i++) {
            const v = markFrames[i].v;
            const d = nx * v[0] + ny * v[1] + nz * v[2];
            if (d > mBest) { mBest = d; mi = i; }
          }
          const mAng = Math.acos(mBest > 1 ? 1 : mBest < -1 ? -1 : mBest);
          const mf = markFrames[mi];
          const mx = nx - mBest * mf.v[0];
          const my = ny - mBest * mf.v[1];
          const mz = nz - mBest * mf.v[2];
          const mPhi = Math.atan2(
            mx * mf.b[0] + my * mf.b[1] + mz * mf.b[2],
            mx * mf.t[0] + my * mf.t[1] + mz * mf.t[2]
          );
          const mEdge = starRadius(mPhi, MARK_OUT, MARK_IN);
          const dist = Math.abs(mAng - mEdge);
          if (dist < MARK_W) {
            const ink = 1 - dist / MARK_W;
            r += (232 - r) * ink;
            g += (86 - g) * ink;
            b += (64 - b) * ink;
          }
        }
      }

      // Grass-contact stain — the underside (local -Y, which stays pointing
      // down regardless of the idle spin since that's the rotation axis)
      // picks up a mossy smudge, breaking the "brand new stock photo" look.
      const stain = Math.max(0, -ny - 0.55) / 0.45;
      if (stain > 0) {
        const s = stain * stain * 0.6 * (0.7 + peb * 0.3);
        r = r * (1 - s) + 26 * s;
        g = g * (1 - s) + 46 * s;
        b = b * (1 - s) + 16 * s;
        rough += stain * 55;
      }

      // Panel grooves: along the star contour, and where two white panels meet
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
        h -= groove * 1.15;
        const shade = groove * 0.5;
        r *= 1 - shade * 0.55;
        g *= 1 - shade * 0.55;
        b *= 1 - shade * 0.55;
        rough += groove * 60;
      }

      const i4 = (py * size + px) * 4;
      cd[i4] = r < 0 ? 0 : r > 255 ? 255 : r;
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

  // Derive a tangent-space normal map from the height field
  const normCanvas = document.createElement("canvas");
  normCanvas.width = size; normCanvas.height = size;
  const normCtx = normCanvas.getContext("2d")!;
  const normImg = normCtx.createImageData(size, size);
  const nd = normImg.data;
  const STRENGTH = 2.4;

  for (let py = 0; py < size; py++) {
    const lat = ((py + 0.5) / size) * Math.PI;
    // Columns bunch up near the poles — rescale so bumps stay round
    const lonScale = 1 / Math.max(Math.sin(lat), 0.22);
    const rowUp = py > 0 ? py - 1 : py;
    const rowDn = py < size - 1 ? py + 1 : py;

    for (let px = 0; px < size; px++) {
      const left = px > 0 ? px - 1 : size - 1;
      const right = px < size - 1 ? px + 1 : 0;

      const dhdu = (height[py * size + right] - height[py * size + left]) * 0.5 * lonScale;
      const dhdv = (height[rowDn * size + px] - height[rowUp * size + px]) * 0.5;

      let vx = -dhdu * STRENGTH;
      let vy = dhdv * STRENGTH;
      const len = Math.sqrt(vx * vx + vy * vy + 1);
      vx /= len; vy /= len;
      const vz = 1 / len;

      const i4 = (py * size + px) * 4;
      nd[i4] = (vx * 0.5 + 0.5) * 255;
      nd[i4 + 1] = (vy * 0.5 + 0.5) * 255;
      nd[i4 + 2] = (vz * 0.5 + 0.5) * 255;
      nd[i4 + 3] = 255;
    }
  }
  normCtx.putImageData(normImg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = 16;
  colorMap.wrapS = THREE.RepeatWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = 8;
  roughnessMap.wrapS = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.anisotropy = 8;
  normalMap.wrapS = THREE.RepeatWrapping;

  return { colorMap, roughnessMap, normalMap };
}

// How far the resting ball sinks below the nominal contact height, so its
// lower slice reads as embedded in turf rather than balanced on a floor.
const SINK_DEPTH = 0.1;
const SINK_DURATION = 0.7;

export default function FootballBall({ scrollProgress }: { scrollProgress: number }) {
  const rbRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [bodyType, setBodyType] = useState<"dynamic" | "kinematicPosition">("dynamic");
  const settled = useRef(false);
  const settleElapsed = useRef(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const segments = isMobile ? 56 : 160;

  const { colorMap, roughnessMap, normalMap } = useMemo(
    () => createBallMaps(isMobile ? TEX_MOBILE : TEX),
    [isMobile]
  );

  useEffect(() => {
    return () => {
      colorMap.dispose();
      roughnessMap.dispose();
      normalMap.dispose();
    };
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
      settleElapsed.current += delta;
      const t = Math.min(settleElapsed.current / SINK_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const y = BALL_RADIUS - SINK_DEPTH * eased;
      rbRef.current.setNextKinematicTranslation({ x: 0, y, z: 0 });
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
        <sphereGeometry args={[BALL_RADIUS, segments, segments]} />
        <meshPhysicalMaterial
          ref={matRef}
          map={colorMap}
          roughnessMap={roughnessMap}
          normalMap={normalMap}
          normalScale={[0.32, 0.32]}
          roughness={1.0}
          metalness={0.0}
          clearcoat={isMobile ? 0 : 0.28}
          clearcoatRoughness={0.32}
          reflectivity={isMobile ? 0.12 : 0.2}
          envMapIntensity={isMobile ? 0.4 : 0.55}
        />
      </mesh>
    </RigidBody>
  );
}
