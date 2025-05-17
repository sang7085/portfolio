

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { useGLTF, Text, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useControls } from 'leva';



// Torus Component
function Torus() {

  const { nodes } = useGLTF("/assets/images/torrus.glb");

  const { viewport } = useThree()

  const torus = useRef(null);

  useFrame(() => {
    torus.current.rotation.x += 0.005
    torus.current.rotation.y += 0.005
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  })
  return (
    <group scale={viewport.width / 5} >
      <Text font="/font/BebasNeue-Regular.ttf" position={[.7, .7, -1]} fontSize={1.3} color="white" anchorX="center" anchorY="middle">
        PUBLISHING
      </Text>
      <Text font="/font/BebasNeue-Regular.ttf" position={[-.7, -.7, -1]} fontSize={1.3} color="white" anchorX="center" anchorY="middle">
        portfolio
      </Text>
      <mesh ref={torus} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Main Visual Component
export default function VisualComp({ isActive }) {
  const motionRef = useRef([]);
  const text = "PUBLISHING".split("");

  useEffect(() => {
    // gsap.set(motionRef.current, { y: 50, opacity: 0 });
    // gsap.to(motionRef.current, {
    //   y: 0,
    //   opacity: 1,
    //   stagger: 0.1,
    //   ease: "quart.inOut",
    // });
  }, []);

  return (
    <section className={`visual-section ${isActive ? 'active' : ''}`}>
      <div className="canvas-image-wrap">
        <Canvas style={{ background: '#000000' }}>
          {/* <CanvasContent /> */}
          <Torus />
          <directionalLight intensity={2} position={[0, 2, 3]} />
          <Environment preset="city" />

        </Canvas>
      </div>
    </section>
  );
}
