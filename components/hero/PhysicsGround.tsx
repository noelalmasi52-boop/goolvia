"use client";

import { RigidBody } from "@react-three/rapier";

export default function PhysicsGround() {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, -0.05, 0]}>
      <mesh>
        <boxGeometry args={[200, 0.1, 200]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}
