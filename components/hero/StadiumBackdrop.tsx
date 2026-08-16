"use client";

import { useState, useEffect } from "react";
import * as THREE from "three";

const W = 2048;
const H = 1024;

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function createStadiumTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Deep navy sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.18);
  sky.addColorStop(0, "#060810");
  sky.addColorStop(1, "#090e1a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.18);

  // Curved roof overhang
  ctx.fillStyle = "#040608";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.16);
  ctx.quadraticCurveTo(W * 0.5, H * 0.04, W, H * 0.16);
  ctx.lineTo(W, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  // Upper tier concrete structure
  ctx.fillStyle = "#0d1420";
  ctx.fillRect(0, H * 0.16, W, H * 0.02);

  // Two crowd tiers — much brighter
  const tiers = [
    { top: 0.18, bottom: 0.46, density: 5000, size: 4.5, bright: 0.72 },
    { top: 0.48, bottom: 0.74, density: 6000, size: 5.2, bright: 0.88 },
  ];

  tiers.forEach((tier, ti) => {
    const yTop = H * tier.top;
    const yBot = H * tier.bottom;

    // Tier base — visible dark blue-grey
    const grad = ctx.createLinearGradient(0, yTop, 0, yBot);
    grad.addColorStop(0, "#10182a");
    grad.addColorStop(1, "#141e30");
    ctx.fillStyle = grad;
    ctx.fillRect(0, yTop, W, yBot - yTop);

    // Row lines — visible separators
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = 1.5;
    const rowHeight = 8;
    for (let y = yTop; y < yBot; y += rowHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Crowd speckle — much brighter, colour-varied
    for (let i = 0; i < tier.density; i++) {
      const s = i + ti * 20000;
      const x = rand(s) * W;
      const yFrac = rand(s + 0.37);
      const y = yTop + yFrac * (yBot - yTop);

      // Stronger centre falloff (floodlights hit the middle hardest)
      const centreFall = 1 - Math.abs(x / W - 0.5) * 0.9;
      const lum = tier.bright * Math.max(centreFall, 0.25) * (0.55 + rand(s + 0.71) * 0.45);

      // Mix of white shirts, coloured shirts, and skin tones
      const hue = rand(s + 0.53);
      let r: number, g: number, b: number;
      if (hue < 0.55) {
        // White / light shirts (majority)
        r = Math.round(255 * lum * (0.92 + hue * 0.08));
        g = Math.round(255 * lum * (0.90 + hue * 0.06));
        b = Math.round(255 * lum * (0.94 + hue * 0.04));
      } else if (hue < 0.72) {
        // Team red
        r = Math.round(255 * lum * 1.0);
        g = Math.round(255 * lum * 0.28);
        b = Math.round(255 * lum * 0.22);
      } else if (hue < 0.86) {
        // Team blue
        r = Math.round(255 * lum * 0.22);
        g = Math.round(255 * lum * 0.46);
        b = Math.round(255 * lum * 1.0);
      } else {
        // Yellow / gold scarf
        r = Math.round(255 * lum * 1.0);
        g = Math.round(255 * lum * 0.80);
        b = Math.round(255 * lum * 0.10);
      }

      ctx.fillStyle = `rgb(${Math.min(r,255)},${Math.min(g,255)},${Math.min(b,255)})`;
      ctx.fillRect(x, y, tier.size, tier.size * 0.7);
    }

    // Light scattering from floodlights — warm glow over crowd
    const glow = ctx.createLinearGradient(W * 0.1, yTop, W * 0.9, yTop);
    glow.addColorStop(0,   "rgba(255,240,180,0.0)");
    glow.addColorStop(0.2, "rgba(255,240,180,0.06)");
    glow.addColorStop(0.5, "rgba(255,244,196,0.12)");
    glow.addColorStop(0.8, "rgba(255,240,180,0.06)");
    glow.addColorStop(1,   "rgba(255,240,180,0.0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, yTop, W, yBot - yTop);
  });

  // Concrete divider strip between tiers
  ctx.fillStyle = "#080e18";
  ctx.fillRect(0, H * 0.455, W, H * 0.026);

  // Pitch-side advertising hoardings — lit warm strip
  const adGrad = ctx.createLinearGradient(0, H * 0.74, 0, H * 0.78);
  adGrad.addColorStop(0, "#221a08");
  adGrad.addColorStop(0.5, "#2e2208");
  adGrad.addColorStop(1, "#181206");
  ctx.fillStyle = adGrad;
  ctx.fillRect(0, H * 0.74, W, H * 0.04);

  // Floodlight banks — bright and unmistakable
  const banks = [
    { x: 0.10, y: 0.09, scale: 1.1 },
    { x: 0.28, y: 0.065, scale: 0.95 },
    { x: 0.50, y: 0.050, scale: 1.0 },
    { x: 0.72, y: 0.065, scale: 0.95 },
    { x: 0.90, y: 0.09, scale: 1.1 },
  ];

  banks.forEach((bank) => {
    const bx = W * bank.x;
    const by = H * bank.y;
    const s = bank.scale;

    // Large atmospheric halo — very visible
    const outerHalo = ctx.createRadialGradient(bx, by, 0, bx, by, 380 * s);
    outerHalo.addColorStop(0,   "rgba(255,248,200,0.55)");
    outerHalo.addColorStop(0.15,"rgba(255,244,180,0.28)");
    outerHalo.addColorStop(0.40,"rgba(255,240,160,0.10)");
    outerHalo.addColorStop(0.70,"rgba(255,238,150,0.03)");
    outerHalo.addColorStop(1,   "rgba(255,235,140,0)");
    ctx.fillStyle = outerHalo;
    ctx.beginPath();
    ctx.arc(bx, by, 380 * s, 0, Math.PI * 2);
    ctx.fill();

    // Individual lamp grid
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        const lx = bx + (col - 3) * 16 * s;
        const ly = by + (row - 1) * 14 * s;

        // Per-lamp glow
        const lamp = ctx.createRadialGradient(lx, ly, 0, lx, ly, 18 * s);
        lamp.addColorStop(0,    "rgba(255,254,240,1.0)");
        lamp.addColorStop(0.25, "rgba(255,250,210,0.70)");
        lamp.addColorStop(0.60, "rgba(255,245,190,0.25)");
        lamp.addColorStop(1,    "rgba(255,240,170,0)");
        ctx.fillStyle = lamp;
        ctx.beginPath();
        ctx.arc(lx, ly, 18 * s, 0, Math.PI * 2);
        ctx.fill();

        // Bright lamp centre dot
        ctx.fillStyle = "rgba(255,255,255,1.0)";
        ctx.beginPath();
        ctx.arc(lx, ly, 3.2 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Wide light shaft toward pitch
    const shaft = ctx.createLinearGradient(bx, by, bx, H * 0.80);
    shaft.addColorStop(0,   "rgba(255,248,200,0.22)");
    shaft.addColorStop(0.3, "rgba(255,246,190,0.09)");
    shaft.addColorStop(0.7, "rgba(255,244,180,0.03)");
    shaft.addColorStop(1,   "rgba(255,244,180,0)");
    ctx.fillStyle = shaft;
    ctx.beginPath();
    ctx.moveTo(bx - 55 * s, by);
    ctx.lineTo(bx + 55 * s, by);
    ctx.lineTo(bx + 220 * s, H * 0.80);
    ctx.lineTo(bx - 220 * s, H * 0.80);
    ctx.closePath();
    ctx.fill();
  });

  // Camera flashes — more, brighter
  for (let i = 0; i < 180; i++) {
    const x = rand(i + 5000) * W;
    const y = H * (0.19 + rand(i + 5500) * 0.52);
    const r = 2.0 + rand(i + 6000) * 3.5;
    const flash = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
    flash.addColorStop(0,   "rgba(255,255,255,0.95)");
    flash.addColorStop(0.2, "rgba(220,235,255,0.45)");
    flash.addColorStop(0.6, "rgba(200,220,255,0.12)");
    flash.addColorStop(1,   "rgba(200,220,255,0)");
    ctx.fillStyle = flash;
    ctx.beginPath();
    ctx.arc(x, y, r * 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ground haze — fades into the pitch below
  const haze = ctx.createLinearGradient(0, H * 0.76, 0, H);
  haze.addColorStop(0,    "rgba(5,8,14,0)");
  haze.addColorStop(0.35, "rgba(5,8,14,0.70)");
  haze.addColorStop(1,    "rgba(4,6,10,1)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, H * 0.76, W, H * 0.24);

  // Edge vignette for curved-bowl feel
  const edges = ctx.createLinearGradient(0, 0, W, 0);
  edges.addColorStop(0,    "rgba(2,3,6,0.90)");
  edges.addColorStop(0.14, "rgba(2,3,6,0.30)");
  edges.addColorStop(0.5,  "rgba(2,3,6,0)");
  edges.addColorStop(0.86, "rgba(2,3,6,0.30)");
  edges.addColorStop(1,    "rgba(2,3,6,0.90)");
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
    <mesh position={[0, 7, -22]}>
      <planeGeometry args={[80, 40]} />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        fog={false}
        depthWrite={false}
      />
    </mesh>
  );
}
