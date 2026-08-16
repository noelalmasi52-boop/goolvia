"use client";

import { useState, useEffect } from "react";
import * as THREE from "three";

/**
 * Photographic stadium backdrop.
 *
 * Expects a real stadium photo at: public/stadium.jpg
 * If the file is missing the component renders nothing rather than
 * breaking the scene.
 */
const PHOTO_URL = "/stadium.jpg";

// Plane height in world units. Width is derived from the photo's aspect.
const PLANE_HEIGHT = 40;

// Multiplied over the photo. The source is a bright daytime shot, so this
// pulls it down to a moody dusk that sits with the black/gold design.
// Raise toward #ffffff for a brighter backdrop, lower for darker.
const DIM = "#39424f";

export default function StadiumBackdrop() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [aspect, setAspect] = useState(16 / 9);

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
        if (img?.width && img?.height) {
          setAspect(img.width / img.height);
        }
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

  if (!texture) return null;

  return (
    <group position={[0, 1, -18]}>
      {/* The photo itself */}
      <mesh>
        <planeGeometry args={[PLANE_HEIGHT * aspect, PLANE_HEIGHT]} />
        <meshBasicMaterial
          map={texture}
          color={DIM}
          toneMapped={false}
          fog={false}
          depthWrite={false}
        />
      </mesh>

      {/* Vignette: fades the photo to black at the top and sides so the
          headline stays readable and the ball reads against darkness. */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[PLANE_HEIGHT * aspect, PLANE_HEIGHT]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          fog={false}
          uniforms={{}}
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
              // Fade to black toward the top of the frame
              float top = smoothstep(0.58, 1.0, vUv.y);
              // Fade to black toward the left and right edges
              float sides = smoothstep(0.34, 0.0, min(vUv.x, 1.0 - vUv.x));
              // Fade the bottom so the photo's pitch melts into the 3D ground
              float bottom = smoothstep(0.34, 0.0, vUv.y);
              float a = clamp(top * 0.92 + sides * 0.80 + bottom * 0.95, 0.0, 1.0);
              gl_FragColor = vec4(0.0, 0.0, 0.0, a);
            }
          `}
        />
      </mesh>
    </group>
  );
}
