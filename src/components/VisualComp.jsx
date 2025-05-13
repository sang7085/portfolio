'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { Text } from '@react-three/drei';

// Blob Component
function Blob() {
  const meshRef = useRef();
  const initialPositions = useRef([]);
  const isInitialized = useRef(false);

  // geometry는 생성될 때 position값을 배열로 담음
  // onUpdate 즉, geometry 생성되었을 때 위치값 얻어오면 NaN값이 들어가지 않음(렌더링 오류 없애기)
  const initializeGeometry = (geometry) => {
    if (geometry.attributes.position) {
      const positions = geometry.attributes.position.array;
      initialPositions.current = Array.from(positions);

      geometry.computeBoundingSphere();
      isInitialized.current = true;
    }
  };
  useFrame(() => {
    const time = performance.now() * 0.001;
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions.current[i];
      const y = initialPositions.current[i + 1];
      const z = initialPositions.current[i + 2];

      positions[i] = x + Math.sin(time + y * 5) * 0.05;
      positions[i + 1] = y + Math.sin(time + z * 5) * 0.05;
      positions[i + 2] = z + Math.sin(time + x * 5) * 0.05;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <sphereGeometry args={[1.5, 128, 128]} onUpdate={(geometry) => initializeGeometry(geometry)} />
      <meshPhysicalMaterial 
        color="#800000"            // 진한 붉은색
        metalness={1}              // 최대 금속성
        roughness={0.2}            // 매끄러운 표면
        clearcoat={1}              // 유광 코팅
        clearcoatRoughness={0.05}  // 유리 같은 광택
        reflectivity={1}           // 반사율 극대화
        sheen={0.8}                // 금속 반짝임 효과
        sheenColor="#ff0000"       // 붉은 반사광
      />
    </mesh>
  );
}

// Fluid Effect Component
function CanvasContent() {
  const { size } = useThree();
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

// Main Visual Component
export default function VisualComp({ isActive }) {
  const motionRef = useRef([]);
  const text = "PUBLISHING".split("");

  useEffect(() => {
    gsap.set(motionRef.current, { y: 50, opacity: 0 });
    gsap.to(motionRef.current, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "quart.inOut",
    });
  }, []);

  return (
    <section className={`visual-section ${isActive ? 'active' : ''}`}>
      <div className="fluid-image-wrap">
        <Canvas>
          <CanvasContent />
          {/* 조명 설정 */}
          {/* <ambientLight intensity={1.2} color="#ffffff" /> */}
          {/* <pointLight position={[5, 5, 5]} intensity={1} color="#ff0000" /> */}
          {/* <pointLight position={[-5, -5, 5]} intensity={6} color="#aa0000" /> */}
          <directionalLight position={[3, 3, 3]} intensity={8} color="#fff" />
          <directionalLight position={[-3, -3, 3]} intensity={2} color="#fff" />
          <Blob />
        </Canvas>
      </div>
      <div className="visual-txt motion-txt-wrap">
        {text.map((letter, index) => (
          <div className="motion-txt" key={index} ref={el => (motionRef.current[index] = el)}>
            {letter}
          </div>
        ))}
      </div>
      <div className="fake-wall-wrap">
        <div className="left-wall"></div>
        <div className="right-wall"></div>
      </div>
    </section>
  );
}
