"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const BALL_RADIUS = 0.56;

// UCL Finale ball: navy pentagons, white hexagons, gold seams
function createUCLTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVerts = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
  ];
  const verts = rawVerts.map(([x, y, z]) => {
    const l = Math.sqrt(x * x + y * y + z * z);
    return [x / l, y / l, z / l] as [number, number, number];
  });

  const img = ctx.createImageData(size, size);
  const d = img.data;
  const TAU = Math.PI * 2;

  for (let py = 0; py < size; py++) {
    const lat = (py / size) * Math.PI;
    const sy = Math.sin(lat);
    const cy = Math.cos(lat);

    for (let px = 0; px < size; px++) {
      const lon = (px / size) * TAU - Math.PI;
      const sx = sy * Math.cos(lon);
      const y3 = cy;
      const sz = sy * Math.sin(lon);

      let maxDot = -1, secDot = -1;
      for (const [vx, vy, vz] of verts) {
        const dot = sx * vx + y3 * vy + sz * vz;
        if (dot > maxDot) { secDot = maxDot; maxDot = dot; }
        else if (dot > secDot) { secDot = dot; }
      }
      const border = maxDot - secDot;
      const i = (py * size + px) * 4;

      if (maxDot > 0.86) {
        // Pentagon: UCL deep navy
        const t = (maxDot - 0.86) / 0.14;
        d[i] = Math.round(12 + t * 10);
        d[i + 1] = Math.round(28 + t * 14);
        d[i + 2] = Math.round(80 + t * 40);

      } else if (border < 0.055) {
        // Seam zone
        const t = border / 0.055;
        if (t < 0.18) {
          d[i] = 6; d[i + 1] = 14; d[i + 2] = 44;
        } else if (t < 0.45) {
          const gt = (t - 0.18) / 0.27;
          d[i] = Math.round(160 + gt * 40);
          d[i + 1] = Math.round(110 + gt * 30);
          d[i + 2] = Math.round(30 + gt * 15);
        } else {
          const wt = (t - 0.45) / 0.55;
          d[i] = Math.round(200 + wt * 52);
          d[i + 1] = Math.round(140 + wt * 110);
          d[i + 2] = Math.round(45 + wt * 205);
        }

      } else {
        // Hexagon: bright white
        d[i] = 248; d[i + 1] = 248; d[i + 2] = 252;
      }

      d[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createRoughnessMap(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVerts = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
  ];
  const verts = rawVerts.map(([x, y, z]) => {
    const l = Math.sqrt(x * x + y * y + z * z);
    return [x / l, y / l, z / l] as [number, number, number];
  });

  const img = ctx.createImageData(size, size);
  const d = img.data;
  const TAU = Math.PI * 2;

  for (let py = 0; py < size; py++) {
    const lat = (py / size) * Math.PI;
    const sy = Math.sin(lat);
    const cy = Math.cos(lat);
    for (let px = 0; px < size; px++) {
      const lon = (px / size) * TAU - Math.PI;
      const sx = sy * Math.cos(lon);
      const y3 = cy;
      const sz = sy * Math.sin(lon);

      let maxDot = -1, secDot = -1;
      for (const [vx, vy, vz] of verts) {
        const dot = sx * vx + y3 * vy + sz * vz;
        if (dot > maxDot) { secDot = maxDot; maxDot = dot; }
        else if (dot > secDot) { secDot = dot; }
      }
      const border = maxDot - secDot;

      const idx = (py * size + px) * 4;
      let rough: number;
      if (maxDot > 0.86) rough = 140;
      else if (border < 0.055) rough = 220;
      else rough = 100;
      d[idx] = rough; d[idx + 1] = rough; d[idx + 2] = rough; d[idx + 3] = 255;
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
          roughness={0.55}
          metalness={0.0}
          clearcoat={0.35}
          clearcoatRoughness={0.15}
          envMapIntensity={1.8}
          reflectivity={0.5}
        />
      </mesh>
    </RigidBody>
  );
}
