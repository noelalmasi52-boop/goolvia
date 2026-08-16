"use client";

import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect } from "react";
import FootballBall from "./FootballBall";
import PhysicsGround from "./PhysicsGround";
import VisualGround from "./VisualGround";
import SceneLighting from "./SceneLighting";
import SceneCamera from "./SceneCamera";

function CanvasSizer() {
  const { gl } = useThree();
  useEffect(() => {
    const sync = () => gl.setSize(window.innerWidth, window.innerHeight);
    sync();
    window.addEventListener("resize", sync);
    const onVisible = () => { if (!document.hidden) sync(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [gl]);
  return null;
}

interface HeroSceneProps {
  scrollProgress: number;
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.8, 9], fov: 52 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: 3,
        toneMappingExposure: 1.1,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "#050608",
      }}
    >
      <CanvasSizer />
      <Suspense fallback={null}>
        <fog attach="fog" args={["#050608", 14, 38]} />
        <SceneLighting />
        <VisualGround />
        <Physics gravity={[0, -14, 0]}>
          <FootballBall scrollProgress={scrollProgress} />
          <PhysicsGround />
        </Physics>
        <SceneCamera scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
