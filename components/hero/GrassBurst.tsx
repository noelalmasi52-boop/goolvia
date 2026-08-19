"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POOL = 48;
const GRAVITY = 7;

type Particle = {
  active: boolean;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  rotY: number;
  rotSpeed: number;
  scale: number;
};

export type GrassBurstHandle = {
  burst: (x: number, z: number) => void;
};

// Small green blade sprites that kick up and scatter when the ball lands —
// an instanced pool so a burst costs no allocation at runtime.
const GrassBurst = forwardRef<GrassBurstHandle>((_props, ref) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorA = useMemo(() => new THREE.Color("#3f8a22"), []);
  const colorB = useMemo(() => new THREE.Color("#6bb23a"), []);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: POOL }, () => ({
        active: false,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        life: 0,
        rotY: 0,
        rotSpeed: 0,
        scale: 0,
      })),
    []
  );

  useImperativeHandle(ref, () => ({
    burst(x: number, z: number) {
      const mesh = meshRef.current;
      let spawned = 0;
      const count = 14;
      for (let i = 0; i < particles.length && spawned < count; i++) {
        const p = particles[i];
        if (p.active) continue;
        const ang = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.0;
        p.pos.set(x + (Math.random() - 0.5) * 0.2, 0.02, z + (Math.random() - 0.5) * 0.2);
        p.vel.set(Math.cos(ang) * speed, 1.6 + Math.random() * 2.0, Math.sin(ang) * speed);
        p.life = 1;
        p.rotY = Math.random() * Math.PI * 2;
        p.rotSpeed = (Math.random() - 0.5) * 12;
        p.scale = 0.045 + Math.random() * 0.05;
        p.active = true;
        if (mesh) mesh.setColorAt(i, Math.random() > 0.5 ? colorA : colorB);
        spawned++;
      }
      if (mesh?.instanceColor) mesh.instanceColor.needsUpdate = true;
    },
  }));

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dt = Math.min(delta, 0.05);

    particles.forEach((p, i) => {
      if (!p.active) return;

      p.life -= dt * 1.3;
      if (p.life <= 0) {
        p.active = false;
        dummy.position.set(0, -1000, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        return;
      }

      p.vel.y -= GRAVITY * dt;
      p.pos.addScaledVector(p.vel, dt);
      if (p.pos.y < 0.01) {
        p.pos.y = 0.01;
        p.vel.y *= -0.15;
        p.vel.x *= 0.5;
        p.vel.z *= 0.5;
      }
      p.rotY += p.rotSpeed * dt;

      dummy.position.copy(p.pos);
      dummy.rotation.set(0.4, p.rotY, 0);
      const s = p.scale * Math.max(0, p.life);
      dummy.scale.set(s, s * 2.4, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, POOL]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#4a9528" side={THREE.DoubleSide} toneMapped={false} />
    </instancedMesh>
  );
});

GrassBurst.displayName = "GrassBurst";
export default GrassBurst;
