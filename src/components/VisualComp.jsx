

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { Environment, OrthographicCamera } from '@react-three/drei';
import { useControls, Leva } from 'leva';
import { CustomEase } from 'gsap/dist/CustomEase';
import MeshBlob from "./MeshBlob";

// font
import { Anton } from "next/font/google";
import { Orbitron } from "next/font/google";
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// easing
gsap.registerPlugin(CustomEase);




// Torus Component
function Torus() {

  // const { nodes } = useGLTF("/assets/images/torrus.glb");

  const { viewport } = useThree()

  // const sphereRef = useRef(null);
  // const torus1 = useRef(null);
  // const torus2 = useRef(null);
  // const torus3 = useRef(null);

  useFrame(() => {
    // sphereRef.current.rotation.x += 0.002
    // sphereRef.current.rotation.y += 0.002
    // torus1.current.rotation.x += 0.005;
    // torus1.current.rotation.y += 0.005;
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
      </mesh>
      <mesh scale={[1, 1.4, 1]} ref={torus1} geometry={new THREE.TorusGeometry(0.5, 0.03, 32, 100)}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>

      <mesh scale={[1.4, 1, 1]} ref={torus2} geometry={new THREE.TorusGeometry(0.5, 0.03, 32, 100)}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh> */}

    </group>
  );
}

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
          backgroundColor="#fff"
          fluidColor="#fff"
        />
      </EffectComposer>
    </>
  );
}

// Main Visual Component
export default function VisualComp({ introStatus }) {
  // 블롭 초기 설정값
  const blobRendersRef = useRef({ blobFreq: 1, surfaceFreq: 1, color: "black", bumpy: false, baseRadius: 1,});

  // 비주얼 텍스트 모션
  const blobRef = useRef([]);
  const blobWrapRef = useRef([]);
  // const lineRefs = useRef([]);
  const motionRef = useRef([]);
  const motionRef2 = useRef([]);
  const text = "INTERACTIVE".split("");
  const text2 = "DEVELOPER".split("");

  const topRef = useRef([]);
  const bottomRef = useRef([]);
  const circleRef = useRef([]);

  useEffect(() => {

    // easing
    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

    if (!introStatus) {
      gsap.to(blobWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "gentleEase",
      })
      gsap.to(motionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "gentleEase",
        stagger: 0.05,
      });
      gsap.to(motionRef2.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".txt-wrap-area",
          start: "top top",
          end: "+=200% bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
        }
      });

      tl.to(topRef.current, { x: "-110%" })
        .to(bottomRef.current, { x: "110%" }, "<")
        .to(blobRef.current.position, { x: -6.5, y: 0, }, "<")

      // flow section start
      const flowTxt = document.querySelectorAll(".flow-txt");

      flowTxt.forEach((el, index) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            // markers: true,
            onEnter() {
              if (index === 0) {
                blobRendersRef.current.baseRadius = 1;
                gsap.to(blobRendersRef.current, {
                  baseRadius: 4,
                  duration: 2,
                  ease: "gentleEase",
                });
              }
              if (index === 1) {
                blobRendersRef.current.blobFreq = 1;
                blobRendersRef.current.surfaceFreq = 1;
                gsap.to(blobRendersRef.current, {
                  blobFreq: 3,
                  surfaceFreq: 9,
                  duration: 2,
                  ease: "gentleEase",
                });
              }
              if (index === 2) {
                blobRendersRef.current.bumpy = true;
                gsap.set(blobRef.current.position, { x: -6.5 });
              }
            },
            onLeaveBack() {
              if (index === 0) {
                gsap.to(blobRendersRef.current, {
                  baseRadius: 1,
                  duration: 2,
                  ease: "gentleEase",
                });
              }
              if (index === 1) {
                gsap.to(blobRendersRef.current, {
                  blobFreq: 1,
                  surfaceFreq: 1,
                  duration: 2,
                  ease: "gentleEase",
                });
              }
              if (index === 2) {
                blobRendersRef.current.bumpy = false;
              }
            }
          },
        });
      });

      // gsap.to(blobRef.current.position, {
      //   x: 0,
      //   scrollTrigger: {
      //     trigger: ".flow-area",
      //     start: "top top",
      //     end: "bottom bottom",
      //     markers: true,
      //     scrub: 1,
      //   }
      // })

      // const tl2 = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".flow-area",
      //     start: "top bottom",
      //     end: "bottom bottom",
      //     markers: true,
      //     scrub: 1,
      //   }
      // })
      
      // tl2.to(circleRef.current, {
      //   scale: 10,
      //   opacity: 1,
      // })
      // .to(blobWrapRef.current, {opacity: 0})
    }
  }, [introStatus]);

  return (
    <section className="visual-section">
      <div className={`canvas-image-wrap ${!introStatus ? "active" : ""}`} ref={blobWrapRef}>
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          {/* <Torus /> */}
          <CanvasContent />
          {/* <Line points={[[-10, -1, 0], [10, -1, 0]]} color="#eeeeee" lineWidth={2} ref={(el) => (lineRefs.current[0] = el)} />
          <Line points={[[-10, 1, 0], [10, 1, 0]]} color="#eeeeee" lineWidth={2} ref={(el) => (lineRefs.current[1] = el)} />
          <Line points={[[-3, -10, 0], [-3, 10, 0]]} color="#eeeeee" lineWidth={2} ref={(el) => (lineRefs.current[2] = el)} />
          <Line points={[[-1, -10, 0], [-1, 10, 0]]} color="#eeeeee" lineWidth={2} ref={(el) => (lineRefs.current[3] = el)} /> */}
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
          <MeshBlob position={[-4, -1.5, 0]} ref={blobRef} blobRendersRef={blobRendersRef} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1.5} position={[0, 2, 2]} />
          <Environment preset="city" />
          <Leva hidden />
        </Canvas>
      </div>
      <div className="txt-wrap-area">
        <div className="txt-wrap" ref={topRef}>
          {text.map((txt, index) => (
            <h2 className={`visual-txt ${orbitron.className}`} ref={(el) => (motionRef.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
        <div className="txt-wrap second" ref={bottomRef}>
          {text2.map((txt, index) => (
            <h2 className={`visual-txt ${orbitron.className}`} ref={(el) => (motionRef2.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
      </div>
      <div className="coment-wrap">
        <p></p>
      </div>
      <ul className="flow-txt-wrap">
        <li className="flow-txt">
          <p className={`txt ${anton.className}`}>
            Optikka leverages Design-as-Code
            transforming traditional design into
            adaptable, intelligent systems for a global
            audience.</p>
        </li>
        <li className="flow-txt">
          <p className={`txt ${anton.className}`}>
            Optikka leverages Design-as-Code
            transforming traditional design into
            adaptable, intelligent systems for a global
            audience.</p>
        </li>
        <li className="flow-txt">
          <p className={`txt ${anton.className}`}>
            Optikka leverages Design-as-Code
            transforming traditional design into
            adaptable, intelligent systems for a global
            audience.</p>
        </li>
      </ul>
      <div className="flow-area">
        <div className="circle" ref={circleRef}></div>
      </div>
    </section>
  );
}
