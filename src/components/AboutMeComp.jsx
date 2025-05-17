'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { TextureLoader } from 'three'
import * as THREE from 'three';

function MyProfile() {
  const texture = useLoader(THREE.TextureLoader, "/assets/images/my-profile.webp");

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2.5, 3]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

// Fluid Effect Component
function CanvasContent() {
  const config = useConfig();
  return (
    <>
      <EffectComposer>
        <Fluid
          {...config}
          radius={0.02}
          curl={10}
          swirl={5}
          distortion={0.2}
          force={2}
          pressure={0.94}
          densityDissipation={0.98}
          velocityDissipation={0.99}
          intensity={0.3}
          rainbow={false}
          blend={0}
          showBackground={false}
          fluidColor="#000"
        />
      </EffectComposer>
    </>
  );
}

export default function AboutMeComp() {
  return (
    <>
      <div className="about-sec">
        <div className="fluid-wrap">
          <Canvas>
            <MyProfile />
            <CanvasContent />
            <directionalLight intensity={2} position={[0, 2, 3]} />
          </Canvas>
        </div>
      </div>
    </>
  )
}