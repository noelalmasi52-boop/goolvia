"use client";

import { useState, useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Full-screen photographic stadium backdrop.
 *
 * Photo: public/stadium.png — pitch-level night stadium shot.
 * Swap the file to change the backdrop; no code changes needed.
 *
 * The plane is parented to the camera and scaled to the frustum every frame,
 * so it always covers the whole viewport — at any aspect ratio, and through
 * the camera's intro move and scroll zoom.
 */
const PHOTO_URL = "/stadium.png";

// Distance in front of the camera. Far enough that everything in the scene
// (ball, ground) renders in front of it.
const DIST = 60;

// Multiplied over the photo. White = shown as-is (photo is already well exposed).
const DIM = "#ffffff";

// Extra size beyond the frustum, so panning never exposes an edge.
const COVER_MARGIN = 1.12;

// No vertical pan — the photo is already framed pitch-level.
const PAN_Y = 0;

export default function StadiumBackdrop() {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [aspect, setAspect] = useState(1.5);
  const { camera, scene, size } = useThree();

  useEffect(() => {
    let disposed = false;
    const loader = new THREE.TextureLoader();

    loader.load(
      PHOTO_URL,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        const img = tex.image as HTMLImageElement;
        if (img?.width && img?.height) setAspect(img.width / img.height);
        setTexture(tex);
      },
      undefined,
      () => {
        console.warn(
          `StadiumBackdrop: could not load ${PHOTO_URL}. ` +
            `Save a stadium photo to public/stadium.jpg to enable the backdrop.`
        );
      }
    );

    return () => {
      disposed = true;
    };
  }, []);

  // Parent the backdrop to the camera so it is always square-on and centred.
  // The camera itself must be in the scene graph for its children to render.
  useEffect(() => {
    const g = groupRef.current;
    if (!g || !texture) return;
    scene.add(camera);
    camera.add(g);
    return () => {
      camera.remove(g);
    };
  }, [camera, scene, texture]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const cam = camera as THREE.PerspectiveCamera;

    // Frustum size at DIST, then cover-fit the photo into it.
    const visibleH = 2 * DIST * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2);
    const visibleW = visibleH * (size.width / size.height);
    const h = Math.max(visibleH, visibleW / aspect) * COVER_MARGIN;

    g.position.set(0, PAN_Y, -DIST);
    g.scale.set(h * aspect, h, 1);
  });

  if (!texture) return null;

  return (
    <group ref={groupRef}>
      {/* The photo */}
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          color={DIM}
          toneMapped={false}
          fog={false}
          depthWrite={false}
        />
      </mesh>

      {/* Gentle vignette — keeps the headline readable without hiding the
          stadium. The HeroUI overlay supplies the stronger left-side scrim. */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          fog={false}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              float top    = smoothstep(0.72, 1.0, vUv.y) * 0.55;
              float bottom = smoothstep(0.30, 0.0, vUv.y) * 0.55;
              float sides  = smoothstep(0.20, 0.0, min(vUv.x, 1.0 - vUv.x)) * 0.45;
              float a = clamp(top + bottom + sides, 0.0, 1.0);
              gl_FragColor = vec4(0.0, 0.0, 0.0, a);
            }
          `}
        />
      </mesh>
    </group>
  );
}
