'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// three.js 
import { Canvas, useThree, useLoader, } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { Text } from '@react-three/drei';

function CanvasContent() {
  const { size } = useThree();
  const config = useConfig();
  const texture = useLoader(THREE.TextureLoader, '/assets/images/img-intro5.png');

  const width = size.width / 700;
  const height = size.height / 300;

  return (
    <>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* <Text
        position={[1, 0, 0.1]}
        fontSize={1}
        color="white"
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Hello
      </Text> */}
      <EffectComposer>
        <Fluid
          {...config}
          radius={0.03}
          curl={10}
          swirl={5}
          distortion={1}
          force={2}
          pressure={0.94}
          densityDissipation={0.98}
          velocityDissipation={0.99}
          intensity={0.3}
          rainbow={false}
          blend={0}
          showBackground={false}
          fluidColor='#000'
        />
      </EffectComposer>
    </>
  );
}

export default function VisualComp({ isActive }) {
  const motionRef = useRef([]);

  useEffect(() => {
    // gsap.set(motionRef.current, {
    //   y: 50,
    //   opacity: 0,
    // });

    // gsap.to(motionRef.current, {
    //   y: 0,
    //   opacity: 1,
    //   stagger: 0.1,
    //   ease: "quart.inOut",
    // });
  }, []);

  const text = "PUBLISHING".split("");

  return (
    <section className={`visual-section ${isActive ? 'active' : ''}`}>
      {/* <div className="visual-txt motion-txt-wrap">
        {text.map((letter, index) => (
          <div className="motion-txt" key={index} ref={el => (motionRef.current[index] = el)}>
            {letter}
          </div>
        ))}
      </div> */}
      <div className="fluid-image-wrap">
        <Canvas>
          <CanvasContent />
        </Canvas>
      </div>
    </section>
  );
}