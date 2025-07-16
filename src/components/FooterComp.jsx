import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { Environment, OrthographicCamera, OrbitControls, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin);
CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

export default function FooterComp({ introStatus }) {

  // Torus Component
  function Torus() {
  
    const { viewport } = useThree()
  
    // const sphereRef = useRef(null);
    const torus1 = useRef(null);
    const torus2 = useRef(null);
    const torus3 = useRef(null);
  
    useFrame(() => {
      // sphereRef.current.rotation.x += 0.002
      // sphereRef.current.rotation.y += 0.002
      torus1.current.rotation.x += 0.005;
      torus1.current.rotation.y += 0.005;
      // torus2.current.rotation.x += -0.005;
      // torus2.current.rotation.y += -0.005;
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
      <group scale={2}>
        {/* <Text font="/font/BebasNeue-Regular.ttf" position={[-.9, .7, 0]} fontSize={.8} color="white" anchorX="center" anchorY="middle">
          PUBLISHING
        </Text> */}
        {/* <Text font="/font/BebasNeue-Regular.ttf" position={[0, 0, 0]} fontSize={.8} color="black" anchorX="center" anchorY="middle">
          INTERACTIVE
        </Text> */}
        {/* <Text font="/font/BebasNeue-Regular.ttf" position={[.9, -.8, 0]} fontSize={.8} color="white" anchorX="center" anchorY="middle">
          DEVELOPER
        </Text> */}
        {/* <mesh ref={sphereRef} geometry={new THREE.SphereGeometry(0.3, 64, 64)}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh> */}
        <mesh scale={[1.5, 1.5, 1.5]} ref={torus1} geometry={new THREE.TorusGeometry(0.5, 0.15, 32, 100)}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
        {/* <mesh scale={[1.4, 1, 1]} ref={torus2} geometry={new THREE.TorusGeometry(0.5, 0.03, 32, 100)}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh> */}
      </group>
    );
  }

  // Fluid Effect Component
  function CanvasContent({ isLight }) {
    const config = useConfig();
    console.log("isLight:", isLight);
    return (
      <>
        <EffectComposer>
          <Fluid
            {...config}
            radius={0.05}
            curl={1}
            swirl={1}
            distortion={0.2}
            force={2}
            pressure={0.94}
            densityDissipation={0.98}
            velocityDissipation={0.99}
            intensity={1}
            rainbow={false}
            blend={0}
            showBackground={false}
            backgroundColor={isLight ? "#fff" : "#121315"}
            fluidColor={isLight ? "#fff" : "#121315"}
          />
        </EffectComposer>
      </>
    );
  }

  return (
    <>
      <footer className="footer">
        <div className="torus-wrap">
          <Canvas>
            <ambientLight intensity={0.5} />
            <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
            <Torus />
            <directionalLight intensity={1.5} position={[0, 2, 2]} />
            <Environment preset="city" background={false} />
            <OrbitControls enableZoom={false} />
            {/* <CanvasContent /> */}
          </Canvas>
        </div>
        <div className="contact-wrap">
          <div className="contact-txt">
            <h3>LETS WORK TOGETHER</h3>
          </div>
          <div className="contact-info">
            <div className="phone-num">
              <a href="tel:+821068997085" aria-label="전화 걸기 010-6899-7085">TEL: 010-6899-7085</a>
            </div>
            <div className="email">
              <a href="mailto:sang7085@gmail.com" aria-label="이메일 보내기 sang7085@gmail.com">Email: sang7085@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
