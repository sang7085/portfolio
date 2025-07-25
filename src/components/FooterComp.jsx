import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { Environment, OrthographicCamera, OrbitControls, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin);
CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

export default function FooterComp({ introStatus, isLight }) {

  // Torus Component
  function Torus() {

    const { viewport } = useThree()
    const torus1 = useRef(null);

    useFrame(() => {
      torus1.current.rotation.x += 0.005;
      torus1.current.rotation.y += 0.005;
    })

    const materialProps = useControls({
      // thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
      // roughness: { value: 0, min: 0, max: 1, step: 0.1 },
      // transmission: { value: 1, min: 0, max: 1, step: 0.1 },
      // ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
      // chromaticAberration: { value: 0.02, min: 0, max: 1 },
      // backside: { value: true },
    })
    return (
      <group scale={2}>
        <mesh scale={[1.5, 1.5, 1.5]} ref={torus1} geometry={new THREE.TorusGeometry(0.5, 0.15, 32, 100)}>
          {/* <MeshTransmissionMaterial {...materialProps} /> */}
          <MeshTransmissionMaterial backside
            thickness={0.5}
            transmission={1}
            roughness={0}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            samples={10}
            resolution={1024}
            // depthWrite={false}
          />
        </mesh>
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
            showBackground={true}
            backgroundColor={"#000"}
            fluidColor={"#000"}
          />
        </EffectComposer>
      </>
    );
  }

  return (
    <>
      <footer id="footer" className="footer">
        <div className="torus-wrap">
          <Canvas>
            <ambientLight intensity={0.5} />
            <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
            <Torus />
            <Text
              position={[0, 0, -2]}
              fontSize={4}
              color={isLight ? "#121315" : "#fff"}
              anchorX="center"
              anchorY="middle"
              font="/font/BebasNeue-Regular.ttf"
              // renderOrder={1}
              material-toneMapped={false}
            >
              CONTACT
            </Text>
            <directionalLight intensity={1.5} position={[0, 2, 2]} />
            <Environment preset="city" background={false} />
            {/* <OrbitControls enableZoom={false} /> */}
          </Canvas>
        </div>
        <div className="contact-wrap">
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
