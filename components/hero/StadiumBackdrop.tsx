"use client";

import { useState, useEffect } from "react";
import * as THREE from "three";

const W = 2048;
const H = 1024;

// Deterministic pseudo-random so the crowd looks the same every render
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function createStadiumTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Night sky above the stands
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#04060a");
  sky.addColorStop(0.28, "#070c14");
  sky.addColorStop(0.52, "#0a121e");
  sky.addColorStop(0.78, "#0d1826");
  sky.addColorStop(1, "#060a10");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Upper tier roof line
  ctx.fillStyle = "#03050a";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.13);
  ctx.quadraticCurveTo(W * 0.5, H * 0.03, W, H * 0.13);
  ctx.lineTo(W, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  // Crowd bowl — two tiers of seated spectators
  const tiers = [
    { top: 0.15, bottom: 0.42, density: 2600, size: 3.0, bright: 0.30 },
    { top: 0.44, bottom: 0.70, density: 3400, size: 3.6, bright: 0.42 },
  ];

  tiers.forEach((tier, ti) => {
    const yTop = H * tier.top;
    const yBot = H * tier.bottom;

    // Tier base
    const grad = ctx.createLinearGradient(0, yTop, 0, yBot);
    grad.addColorStop(0, "#080d15");
    grad.addColorStop(1, "#0c1420");
    ctx.fillStyle = grad;
    ctx.fillRect(0, yTop, W, yBot - yTop);

    // Crowd speckle
    for (let i = 0; i < tier.density; i++) {
      const s = i + ti * 10000;
      const x = rand(s) * W;
      const yFrac = rand(s + 0.37);
      const y = yTop + yFrac * (yBot - yTop);

      // Crowd is brighter toward the centre of the frame (lit by floodlights)
      const centreFall = 1 - Math.abs(x / W - 0.5) * 1.15;
      const lum = tier.bright * Math.max(centreFall, 0.12) * (0.45 + rand(s + 0.71) * 0.55);

      const warm = rand(s + 0.53);
      const r = Math.round(255 * lum * (0.85 + warm * 0.15));
      const g = Math.round(255 * lum * (0.86 + warm * 0.10));
      const b = Math.round(255 * lum * (0.92 - warm * 0.08));

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, y, tier.size, tier.size * 0.72);
    }

    // Horizontal step shadows between rows
    ctx.strokeStyle = "rgba(0,0,0,0.20)";
    ctx.lineWidth = 1;
    for (let y = yTop; y < yBot; y += 7) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  });

  // Divider between tiers (executive boxes / hoardings)
  ctx.fillStyle = "#050810";
  ctx.fillRect(0, H * 0.415, W, H * 0.028);

  // Advertising hoardings around the pitch — dim warm strip
  const adGrad = ctx.createLinearGradient(0, H * 0.70, 0, H * 0.745);
  adGrad.addColorStop(0, "#141008");
  adGrad.addColorStop(0.5, "#1c1608");
  adGrad.addColorStop(1, "#0e0c06");
  ctx.fillStyle = adGrad;
  ctx.fillRect(0, H * 0.70, W, H * 0.045);

  // Floodlight banks — bright glowing clusters along the roof
  const banks = [
    { x: 0.12, y: 0.085, scale: 1.0 },
    { x: 0.30, y: 0.062, scale: 0.85 },
    { x: 0.50, y: 0.050, scale: 0.9 },
    { x: 0.70, y: 0.062, scale: 0.85 },
    { x: 0.88, y: 0.085, scale: 1.0 },
  ];

  banks.forEach((bank) => {
    const bx = W * bank.x;
    const by = H * bank.y;
    const s = bank.scale;

    // Wide atmospheric halo
    const halo = ctx.createRadialGradient(bx, by, 0, bx, by, 260 * s);
    halo.addColorStop(0, "rgba(255,248,214,0.34)");
    halo.addColorStop(0.25, "rgba(255,244,196,0.14)");
    halo.addColorStop(0.6, "rgba(255,240,180,0.045)");
    halo.addColorStop(1, "rgba(255,240,180,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(bx, by, 260 * s, 0, Math.PI * 2);
    ctx.fill();

    // Individual lamps in the bank
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 6; col++) {
        const lx = bx + (col - 2.5) * 17 * s;
        const ly = by + (row - 0.5) * 15 * s;

        const lamp = ctx.createRadialGradient(lx, ly, 0, lx, ly, 13 * s);
        lamp.addColorStop(0, "rgba(255,253,238,0.95)");
        lamp.addColorStop(0.35, "rgba(255,248,210,0.55)");
        lamp.addColorStop(1, "rgba(255,244,190,0)");
        ctx.fillStyle = lamp;
        ctx.beginPath();
        ctx.arc(lx, ly, 13 * s, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255,254,246,0.9)";
        ctx.beginPath();
        ctx.arc(lx, ly, 2.6 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Light shaft falling toward the pitch
    const shaft = ctx.createLinearGradient(bx, by, bx, H * 0.78);
    shaft.addColorStop(0, "rgba(255,248,214,0.14)");
    shaft.addColorStop(0.4, "rgba(255,246,206,0.045)");
    shaft.addColorStop(1, "rgba(255,246,206,0)");
    ctx.fillStyle = shaft;
    ctx.beginPath();
    ctx.moveTo(bx - 42 * s, by);
    ctx.lineTo(bx + 42 * s, by);
    ctx.lineTo(bx + 190 * s, H * 0.78);
    ctx.lineTo(bx - 190 * s, H * 0.78);
    ctx.closePath();
    ctx.fill();
  });

  // Camera-flash sparkles in the crowd
  for (let i = 0; i < 90; i++) {
    const x = rand(i + 5000) * W;
    const y = H * (0.17 + rand(i + 5500) * 0.50);
    const r = 1.6 + rand(i + 6000) * 2.4;
    const flash = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    flash.addColorStop(0, "rgba(255,255,255,0.85)");
    flash.addColorStop(0.3, "rgba(220,235,255,0.30)");
    flash.addColorStop(1, "rgba(220,235,255,0)");
    ctx.fillStyle = flash;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ground haze at the base so the backdrop melts into the pitch
  const haze = ctx.createLinearGradient(0, H * 0.74, 0, H);
  haze.addColorStop(0, "rgba(6,10,16,0)");
  haze.addColorStop(0.45, "rgba(6,10,16,0.75)");
  haze.addColorStop(1, "rgba(5,6,8,1)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, H * 0.74, W, H * 0.26);

  // Darken the far edges so the bowl reads as curved
  const edges = ctx.createLinearGradient(0, 0, W, 0);
  edges.addColorStop(0, "rgba(2,3,6,0.85)");
  edges.addColorStop(0.18, "rgba(2,3,6,0.25)");
  edges.addColorStop(0.5, "rgba(2,3,6,0)");
  edges.addColorStop(0.82, "rgba(2,3,6,0.25)");
  edges.addColorStop(1, "rgba(2,3,6,0.85)");
  ctx.fillStyle = edges;
  ctx.fillRect(0, 0, W, H);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export default function StadiumBackdrop() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const tex = createStadiumTexture();
    setTexture(tex);
    return () => tex.dispose();
  }, []);

  if (!texture) return null;

  return (
    <mesh position={[0, 8.5, -26]}>
      <planeGeometry args={[86, 43]} />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        fog={false}
        depthWrite={false}
      />
    </mesh>
  );
}
