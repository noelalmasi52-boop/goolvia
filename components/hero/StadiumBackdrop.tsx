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

  // Pure black base
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);

  // ---- Blurred stadium stands, tapering toward the centre like a tunnel ----
  // Two soft wedges of bokeh light, bright at the outer edges, fading toward the middle.
  const drawStandWedge = (side: "left" | "right") => {
    const sign = side === "left" ? 1 : -1;
    const originX = side === "left" ? 0 : W;

    for (let i = 0; i < 900; i++) {
      const s = i + (side === "left" ? 0 : 90000);
      const depth = rand(s); // 0 = near/outer edge, 1 = far/centre
      const rowT = rand(s + 0.31);

      // Wedge narrows and rises as it goes toward centre (perspective)
      const bandTop = H * (0.30 - depth * 0.10);
      const bandBottom = H * (0.68 - depth * 0.05);
      const y = bandTop + rowT * (bandBottom - bandTop);

      const edgeX = originX + sign * -1 * 0; // unused, kept for clarity
      const spread = (1 - depth) * W * 0.34 + depth * W * 0.06;
      const x = side === "left"
        ? rand(s + 0.6) * spread
        : W - rand(s + 0.6) * spread;

      const bright = (0.35 + rand(s + 0.8) * 0.65) * (1 - depth * 0.55);
      const r = 2.0 + rand(s + 0.2) * 3.2;

      ctx.filter = `blur(${(2 + depth * 3).toFixed(1)}px)`;
      const dot = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      const warm = rand(s + 0.9);
      const cr = Math.round(255 * bright * (0.85 + warm * 0.15));
      const cg = Math.round(255 * bright * (0.88 + warm * 0.08));
      const cb = Math.round(255 * bright * (0.95 - warm * 0.05));
      dot.addColorStop(0, `rgba(${cr},${cg},${cb},${0.75 * bright})`);
      dot.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = dot;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.filter = "none";
  };

  drawStandWedge("left");
  drawStandWedge("right");

  // Faint horizontal row-glow bands across the stands (suggests tiered seating)
  ctx.filter = "blur(6px)";
  for (let row = 0; row < 10; row++) {
    const y = H * (0.32 + row * 0.032);
    ctx.strokeStyle = `rgba(255,250,235,${0.05 + rand(row) * 0.05})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.filter = "none";

  // ---- Dramatic vertical light beams falling from above ----
  const beams = [
    { x: 0.40, w: 46, bright: 0.30 },
    { x: 0.50, w: 60, bright: 0.42 },
    { x: 0.60, w: 46, bright: 0.30 },
  ];
  ctx.filter = "blur(10px)";
  beams.forEach((beam) => {
    const bx = W * beam.x;
    const grad = ctx.createLinearGradient(bx, 0, bx, H * 0.82);
    grad.addColorStop(0, `rgba(255,252,240,${beam.bright})`);
    grad.addColorStop(0.35, `rgba(255,250,230,${beam.bright * 0.35})`);
    grad.addColorStop(0.7, "rgba(255,248,220,0.05)");
    grad.addColorStop(1, "rgba(255,248,220,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(bx - beam.w * 0.25, 0);
    ctx.lineTo(bx + beam.w * 0.25, 0);
    ctx.lineTo(bx + beam.w, H * 0.82);
    ctx.lineTo(bx - beam.w, H * 0.82);
    ctx.closePath();
    ctx.fill();
  });
  ctx.filter = "none";

  // Small bright source flares at the top of each beam
  beams.forEach((beam) => {
    const bx = W * beam.x;
    const flare = ctx.createRadialGradient(bx, H * 0.02, 0, bx, H * 0.02, 90);
    flare.addColorStop(0, "rgba(255,255,255,0.9)");
    flare.addColorStop(0.3, "rgba(255,250,230,0.4)");
    flare.addColorStop(1, "rgba(255,250,230,0)");
    ctx.fillStyle = flare;
    ctx.beginPath();
    ctx.arc(bx, H * 0.02, 90, 0, Math.PI * 2);
    ctx.fill();
  });

  // ---- Camera-flash sparkles scattered through the stands ----
  for (let i = 0; i < 70; i++) {
    const x = rand(i + 5000) * W;
    const y = H * (0.28 + rand(i + 5500) * 0.42);
    const distFromCentre = Math.abs(x / W - 0.5);
    if (distFromCentre < 0.12) continue; // keep the ball's backdrop clean
    const r = 1.4 + rand(i + 6000) * 2.0;
    const flash = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    flash.addColorStop(0, "rgba(255,255,255,0.85)");
    flash.addColorStop(0.35, "rgba(230,240,255,0.25)");
    flash.addColorStop(1, "rgba(230,240,255,0)");
    ctx.fillStyle = flash;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---- Green pitch strip at the very bottom ----
  const pitchTop = H * 0.80;
  const pitch = ctx.createLinearGradient(0, pitchTop, 0, H);
  pitch.addColorStop(0, "rgba(6,10,8,0)");
  pitch.addColorStop(0.25, "rgba(10,28,16,0.85)");
  pitch.addColorStop(0.6, "rgba(12,34,18,0.95)");
  pitch.addColorStop(1, "rgba(8,22,13,1)");
  ctx.fillStyle = pitch;
  ctx.fillRect(0, pitchTop, W, H - pitchTop);

  // Mown-grass stripes on the pitch strip
  const stripeCount = 14;
  for (let i = 0; i < stripeCount; i++) {
    const x0 = (W / stripeCount) * i;
    const x1 = (W / stripeCount) * (i + 1);
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";
    ctx.beginPath();
    ctx.moveTo(x0, H);
    ctx.lineTo(x1, H);
    ctx.lineTo(W * 0.5 + (x1 - W * 0.5) * 0.15, pitchTop);
    ctx.lineTo(W * 0.5 + (x0 - W * 0.5) * 0.15, pitchTop);
    ctx.closePath();
    ctx.fill();
  }

  // Halfway line arc suggestion
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W * 0.5 - 70, pitchTop + 6);
  ctx.lineTo(W * 0.5 + 70, pitchTop + 6);
  ctx.stroke();

  // Vignette — keep the centre clean and dark at the very top for the ball to pop
  const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.18);
  topFade.addColorStop(0, "rgba(0,0,0,1)");
  topFade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = topFade;
  ctx.fillRect(0, 0, W, H * 0.18);

  const edges = ctx.createLinearGradient(0, 0, W, 0);
  edges.addColorStop(0, "rgba(0,0,0,0.75)");
  edges.addColorStop(0.16, "rgba(0,0,0,0.15)");
  edges.addColorStop(0.5, "rgba(0,0,0,0)");
  edges.addColorStop(0.84, "rgba(0,0,0,0.15)");
  edges.addColorStop(1, "rgba(0,0,0,0.75)");
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
    <mesh position={[0, 6, -18]}>
      <planeGeometry args={[70, 34]} />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        fog={false}
        depthWrite={false}
        transparent
      />
    </mesh>
  );
}
