"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import FootballBall from "./FootballBall";
import PhysicsGround from "./PhysicsGround";
import VisualGround from "./VisualGround";
import StadiumBackdrop from "./StadiumBackdrop";
import SceneLighting from "./SceneLighting";
import SceneCamera from "./SceneCamera";

interface HeroSceneProps {
  scrollProgress: number;
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.8, 9], fov: 52 }}
      dpr={[1, 2]}
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
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#050608", 20, 60]} />
        <SceneLighting />
        <StadiumBackdrop />
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
