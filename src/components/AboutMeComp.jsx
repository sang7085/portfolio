"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid, useConfig } from "@whatisjery/react-fluid-distortion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import * as THREE from "three";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase);

function MyProfile() {
  const texture = useLoader(THREE.TextureLoader, "/assets/images/my-face.jpg");
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
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

export default function AboutMeComp({ introStatus, isLight }) {

  const wrapRef = useRef();
  const txtRef = useRef([]);
  const slideTitWrap = useRef(null);
  const slideTitLeft = useRef(null);
  const slideTitRight = useRef(null);
  const text = "I build responsive, accessible, and interactive interfaces with a focus on clean, reusable code.".split("");

  useEffect(() => {
    if (!introStatus) {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideTitWrap.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      })
      tl.to(slideTitLeft.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" })
        .to(slideTitRight.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" }, "<")



    }
    ScrollTrigger.refresh();
  }, [introStatus]);


  return (
    <>
      <section id="about" className="about-sec" ref={wrapRef}>
        {/* <div className="txt-sec">
          {text.map((txt, index) => (<p className={`txt ${notoSans}`} ref={(el) => (txtRef.current[index] = el)} key={index}>{txt === " " ? "\u00A0" : txt}</p>))}
        </div> */}
        <div className="inner">
          <div className="slide-tit-wrap" ref={slideTitWrap}>
            <h3 className="slide-tit center left" ref={slideTitLeft}>MY</h3>
            <h3 className="slide-tit center right" ref={slideTitRight}>PROFILE</h3>
          </div>
          <div className="about-con">
            <div className="detail-wrap">
              <div className="fluid-wrap">
                <Canvas
                  gl={{ alpha: true, preserveDrawingBuffer: true }}
                  style={{ background: "transparent" }}
                >
                  <MyProfile />
                  <CanvasContent isLight={isLight} />
                  <directionalLight intensity={2} position={[0, 0, 0]} />
                </Canvas>
              </div>
            </div>
            <div className={`txt-wrap`} ref={wrapRef}>
              <p className="txt-list">
                시맨틱 마크업을 기반으로 웹 접근성과 웹 표준을 철저히 준수하며, 남녀노소 누구나 불편 없이 이용할 수 있는 ‘차별 없는 웹’을 지향합니다.
                퍼블리셔로서 단순히 시각적인 구현에 그치지 않고, 구조적인 의미와 사용자 경험을 함께 고려한 작업을 중요하게 생각합니다.
                CSS(SCSS), JavaScript, jQuery를 활용한 인터랙션 구현과 디테일한 퍼블리싱 작업에 흥미를 느끼며, 완성도 높은 UI를 만드는 데에 자부심을 가지고 있습니다.
                최근에는 정적인 마크업을 넘어 보다 동적인 사용자 경험을 제공하기 위해 Node.js, Express, React 등을 학습 중이며, 이를 통해 프론트엔드 개발자로서의 성장을 꾸준히 도모하고 있습니다.
                지금 이 순간에도 새로운 기술을 익히고, 더 나은 코드와 사용자 경험을 고민하며, 퍼블리셔 그 이상의 역할을 할 수 있는 프론트엔드 개발자가 되기 위해 한 걸음씩 나아가고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}