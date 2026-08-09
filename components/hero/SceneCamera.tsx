"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

interface SceneCameraProps {
  scrollProgress: number;
}

export default function SceneCamera({ scrollProgress }: SceneCameraProps) {
  const { camera } = useThree();
  const scrollProgressRef = useRef(0);
  const introComplete = useRef(false);
  const lookTarget = useRef(new THREE.Vector3(0, 0.56, 0));
  const cameraTarget = useRef({ x: 0, y: 2.8, z: 9 });

  useEffect(() => {
    camera.position.set(0, 2.8, 9);
    camera.lookAt(0, 0.56, 0);
  }, [camera]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cameraTarget.current, {
        z: 7,
        y: 2.4,
        duration: 1.8,
        delay: 3.6,
        ease: "power2.inOut",
        onComplete: () => {
          introComplete.current = true;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useFrame(() => {
    const sp = scrollProgressRef.current;

    if (!introComplete.current) {
      if (sp > 0.02) {
        introComplete.current = true;
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraTarget.current.x, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraTarget.current.y, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraTarget.current.z, 0.05);
        camera.lookAt(lookTarget.current);
        return;
      }
    }

    // Zoom toward the ball — ball stays fixed, camera rushes in
    // At sp=0: camera at (0, 2.4, 7)
    // At sp=1: camera at (0, 0.9, 1.8) — ball fills almost the entire frame
    const targetZ = 7 - sp * 5.2;
    const targetY = 2.4 - sp * 1.5;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

    camera.lookAt(lookTarget.current);
  });

  return null;
}
