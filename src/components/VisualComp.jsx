

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
  const blobRendersRef = useRef({ blobFreq: 1, surfaceFreq: 1, color: "black", rotate: false, baseRadius: 2, });

  // 비주얼 텍스트 모션
  const blobRef = useRef([]);
  const blobWrapRef = useRef([]);
  // const lineRefs = useRef([]);
  const motionRef = useRef([]);
  const motionRef2 = useRef([]);
  const text = "INTERACTIVE".split("");
  const text2 = "DEVELOPER".split("");

  const triggerRef = useRef([]);
  const flowRef = useRef([]);
  const topRef = useRef([]);
  const bottomRef = useRef([]);
  const circleRef = useRef([]);

  const textList = [
    "사용자가 가장 먼저 무엇을 느끼고 어디에 몰입할지 방향을 제시할 수 있는, 움직임 하나하나에 담긴 의도와 흐름이 브랜드의 메시지를 사용자에게 어떻게 전달될지를 고민합니다.",
    "형태가 움직이는 작은 변화 속에서, 브랜드가 가진 분위기와 감정을 어떻게 시각적으로 전달할지를 고민합니다.",
    "고정된 틀보다는 맥락에 따라 유동적으로 반응할 수 있는 사고와 표현을 추구합니다. 화면이 상황에 따라 자연스럽게 흘러가듯, 방향성을 가지고 일합니다.",
  ];

  useEffect(() => {

    // easing
    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

    if (!introStatus) {
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
        delay: .5,
        ease: "gentleEase",
        stagger: 0.05,
      });
      gsap.to(blobWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "gentleEase",
      })

      // flow section start
      const flowTxt = document.querySelectorAll(".flow-txt");
      const flowTxtLeng = flowTxt.length;
      const innerTxt = document.querySelectorAll(".flow-txt .txt");

      flowTxt.forEach((el, index) => {
        gsap.to(el, {
          ease: "gentleEase",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            duration: .5,
            ease: "gentleEase",
            onEnter() {
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
                blobRendersRef.current.rotate = true;
              }
            },
            onLeaveBack() {
              if (index === 0) {
                gsap.to(blobRendersRef.current, {
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
                blobRendersRef.current.rotate = false;
              }
            }
          },
        });
      });

      // flowtxt 모션
      flowRef.current.forEach((el, index) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "gentleEase",
          scrollTrigger: {
            trigger: triggerRef.current[index],
            start: "top top+=30%",
            end: "bottom bottom",
            toggleActions: "play none none none",
          },
        });
      });

      // blob 중앙배치
      gsap.to(blobRef.current.position, {
        x: 0,
        y: 0,
        scrollTrigger: {
          trigger: flowTxt[0],
          start: "top bottom",
          end: "+=200% bottom",
          scrub: true,
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flowTxt[flowTxtLeng - 1],
          start: "top top",
          end: "+=150% top",
          scrub: true,
          pin: true,
          pinSpacing: true,
        }
      });

      tl.to(blobRendersRef.current, { baseRadius: 10, })
        .to(flowTxt[flowTxtLeng - 1], { opacity: 0, }, "<")

    }
  }, [introStatus]);

  return (
    <section className="visual-section">
      <div className={`canvas-image-wrap ${!introStatus ? "active" : ""}`} ref={blobWrapRef}>
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Torus />
          <CanvasContent />
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
          <MeshBlob position={[0, -3.5, 0]} ref={blobRef} blobRendersRef={blobRendersRef} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1.5} position={[0, 2, 2]} />
          <Environment preset="city" />
          <Leva hidden />
        </Canvas>
      </div>
      <div className="txt-wrap-area">
        <div className="txt-wrap" ref={topRef}>
          {text.map((txt, index) => (
            <h2 className={`visual-txt ${anton.className}`} ref={(el) => (motionRef.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
        <div className="txt-wrap second" ref={bottomRef}>
          {text2.map((txt, index) => (
            <h2 className={`visual-txt ${anton.className}`} ref={(el) => (motionRef2.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
      </div>
      <div className="coment-wrap">
        <p></p>
      </div>
      {/* <ul className="flow-txt-wrap">
        <li className="flow-txt">
          <p className={`txt`}>
            사용자가 가장 먼저 무엇을 느끼고 어디에 몰입할지 방향을 제시할 수 있는,
            움직임 하나하나에 담긴 의도와 흐름이 브랜드의 메시지를 사용자에게 어떻게 전달될지를 고민합니다.
          </p>
        </li>
        <li className="flow-txt">
          <p className={`txt`}>
            형태가 움직이는 작은 변화 속에서,
            브랜드가 가진 분위기와 감정을 어떻게 시각적으로 전달할지를 고민합니다.
          </p>
        </li>
        <li className="flow-txt">
          <p className={`txt`}>
            고정된 틀보다는 맥락에 따라 유동적으로 반응할 수 있는 사고와 표현을 추구합니다.
            화면이 상황에 따라 자연스럽게 흘러가듯, 저 역시 그런 방향성을 가지고 일합니다.
          </p>
        </li>
      </ul> */}
      <ul className="flow-txt-wrap">
        {textList.map((text, index) => (
          <li className="flow-txt" key={index} ref={(el) => (triggerRef.current[index] = el)}>
            <p className="txt" ref={(el) => (flowRef.current[index] = el)}>
              {text}
            </p>
          </li>
        ))}
      </ul>
      <div className="flow-area">
        <div className="circle" ref={circleRef}></div>
      </div>
    </section>
  );
}
