"use client";

import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { FluidMaterial } from "../shaders/fluidShader";

extend({ FluidMaterial });

export default function FluidImage({ imageUrl }) {
  const materialRef = useRef();
  const { viewport, mouse } = useThree();
  const texture = useTexture(imageUrl);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uMouse = new THREE.Vector2(
        (mouse.x + 1) / 2,
        (mouse.y + 1) / 2
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width / 2, viewport.height / 2]} />
      <fluidMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}
