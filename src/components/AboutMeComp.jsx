'use client';

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { TextureLoader } from 'three'
import { Noto_Sans } from "next/font/google";
import { CustomEase } from 'gsap/dist/CustomEase';
import * as THREE from 'three';

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
          backgroundColor="#fff"
          fluidColor="#fff"
        />
      </EffectComposer>
    </>
  );
}

export default function AboutMeComp() {

  const wrapRef = useRef();
  const txtRef = useRef([]);
  const text = "I build responsive, accessible, and interactive interfaces with a focus on clean, reusable code.".split("");

  useLayoutEffect(() => {
    gsap.set(".txt-list", { y: "60%", x: "-50%", opacity: 0 });
  }, []);

  useEffect(() => {
    gsap.to(txtRef.current, {
      opacity: 1,
      y: 0,
      duration: .5,
      ease: "CustomEase",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".txt-sec",
        start: "top top",
        end: "bottom center",
        // markers: true,
      }
    });

  }, []);


  return (
    <>
      <section className="about-sec" ref={wrapRef}>
        <div className="txt-sec">
          {text.map((txt, index) => (<p className={`txt ${notoSans}`} ref={(el) => (txtRef.current[index] = el)} key={index}>{txt === " " ? "\u00A0" : txt}</p>))}
        </div>
        <div className="fluid-wrap">
          <Canvas>
            <MyProfile />
            <CanvasContent />
            <directionalLight intensity={2} position={[0, 2, 3]} />
          </Canvas>
        </div>
        <div className={`txt-wrap ${notoSans.className}`} ref={wrapRef}>
          <p className="txt-list">I am currently active as</p>
          <p className="txt-list">a frontend engineer.</p>
          <p className="txt-list">i specialize in animations</p>
          <p className="txt-list">and interactive expressions.</p>
          <p className="txt-list">and above all, i love this job.</p>
        </div>
      </section>
    </>
  )
}