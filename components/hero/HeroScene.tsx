"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, Lightformer } from "@react-three/drei";
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
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.8, 9], fov: 52 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobile,
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

        {/* Procedural reflections for the ball's clearcoat — without this,
            the physical material has nothing to reflect and reads as flat
            matte plastic instead of glossy leather. No external HDRI, so
            no extra network fetch. */}
        <Environment resolution={isMobile ? 48 : 128} background={false}>
          <Lightformer form="rect" intensity={3} color="#fff8f0" position={[4, 18, 6]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#e8f4ff" position={[-6, 16, 5]} scale={[8, 8, 1]} />
          <Lightformer form="ring" intensity={0.6} color="#a8c8ff" position={[0, 4, -8]} scale={6} />
          <Lightformer form="rect" intensity={0.3} color="#0a0d12" position={[0, -4, 4]} scale={[20, 20, 1]} />
        </Environment>

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
