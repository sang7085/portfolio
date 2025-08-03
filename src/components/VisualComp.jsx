

import { useEffect, useLayoutEffect, useRef, useState, useCallback, Suspense } from "react";
import { usePathname } from 'next/navigation';
import { gsap } from "gsap";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Environment, OrbitControls } from "@react-three/drei"
import { Leva } from 'leva';
import { useMemo } from "react";
import { CustomEase } from "gsap/dist/CustomEase";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MeshBlob from "./MeshBlob";

// easing
gsap.registerPlugin(ScrollTrigger, CustomEase);


function ClearColorUpdater({ isLight, blobRendersRef }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(isLight ? "#ffffff" : "#121315", 1);
    blobRendersRef.current.color = isLight ? "#121315" : "gray";
  }, [isLight]);

  return null;
}


// Main Visual Component
export default function VisualComp({ introStatus, isLight, blobRendersRef }) {

  // 블롭 초기 설정값
  // const blobRendersRef = useRef({ blobFreq: 1, surfaceFreq: 1, color: "black", rotate: false, baseRadius: 1.5, });

  const pathname = usePathname();
  const mm = gsap.matchMedia();

  // 비주얼 텍스트 모션
  const scrollDownRef = useRef([]);
  const visualSec = useRef([]);
  const blobRef = useRef(null);
  const blobWrapRef = useRef([]);
  const motionRef = useRef([]);
  const motionRef2 = useRef([]);
  const text = "INTERACTIVE".split("");
  const text2 = "DEVELOPER".split("");

  const triggerRef = useRef([]);
  const flowRef = useRef([]);
  const bgLeftRef = useRef([]);
  const bgRightRef = useRef([]);
  const topRef = useRef([]);
  const bottomRef = useRef([]);
  const initPos = useMemo(() => [0, -3.5, 0], []);

  // 반응형


  // easing
  CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

  const setBlobRef = useCallback((mesh) => {
    if (!mesh) return;
    gsap.set(mesh.position, { x: 0, y: -3.5, z: 0 });

    gsap.to(mesh.position, {
      x: 0,
      y: 0,
      scrollTrigger: {
        trigger: triggerRef.current[0],
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  useLayoutEffect(() => {
    // flow section start
    if (!visualSec.current) return;
    const flowTxtEls = visualSec.current.querySelectorAll(".flow-txt");
    const flowTxtLeng = flowTxtEls.length;
    const ctx = gsap.context(() => {
      flowTxtEls.forEach((el, index) => {
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
                  blobFreq: 2,
                  surfaceFreq: 6,
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

    });
    return () => ctx.revert();
  }, [introStatus]);

  useEffect(() => {
    if (!introStatus) {

      const flowTxtEls = visualSec.current.querySelectorAll(".flow-txt");
      const flowTxtLeng = flowTxtEls.length;

      // intro 이후 motion
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

      gsap.to(scrollDownRef.current, {
        opacity: 1,
        y: 0,
        delay: 1,
        ease: "gentleEase",
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visualSec.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      tl.to(topRef.current, { x: "100%" })
        .to(bottomRef.current, { x: "-100%" }, "<")

      // 반응형
      mm.add("(max-width: 479px)", () => {
        // 모바일 코드
        console.log("MOBILE")
        if (!introStatus) {

        }
      });

      mm.add("(min-width: 480px) and (max-width: 1023px)", () => {
        // 태블릿 코드
        console.log("TABLET")
        if (!introStatus) {
          gsap.set(mesh.position, { x: 0, y: -1.5, z: 0 });
        }
      });

      mm.add("(max-width: 1440px)", () => {
        // PC 코드(작은화면)
        console.log("PC")
        const flowTxtEls = visualSec.current.querySelectorAll(".flow-txt");
        const flowTxtLeng = flowTxtEls.length;
        flowRef.current.forEach((el, index) => {
          if (index === flowTxtLeng - 1) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current[index],
              start: "top top",
              end: "bottom+=150% bottom",
              scrub: true,
              pin: true,
            },
          });

          tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "gentleEase" })
            .to(bgLeftRef.current[index], { left: "50%", opacity: 1, duration: 0.6, ease: "gentleEase" }, "<")
            .to(bgRightRef.current[index], { right: "50%", opacity: 1, duration: 0.6, ease: "gentleEase" }, "<");
        });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: flowTxtEls[flowTxtLeng - 1],
            start: "top top",
            end: "bottom+=150% center",
            scrub: true,
            pin: true,
          },
        });

        tl2.to(blobRendersRef.current, { baseRadius: 10, })
          .to(flowTxtEls[flowTxtLeng - 1], { opacity: 0, }, "<")
      });

      mm.add("(min-width: 1441px)", () => {
        // PC 코드(큰화면)
        console.log("PC2")
        // flowtxt 모션
        flowRef.current.forEach((el, index) => {
          if (index === flowTxtLeng - 1) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current[index],
              start: "top top",
              end: "bottom+=150% bottom",
              scrub: true,
              pin: true,
            },
          });

          tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "gentleEase" })
            .to(bgLeftRef.current[index], { top: "50%", opacity: 1, duration: 0.6, ease: "gentleEase" }, "<")
            .to(bgRightRef.current[index], { bottom: "50%", opacity: 1, duration: 0.6, ease: "gentleEase" }, "<");
        });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: flowTxtEls[flowTxtLeng - 1],
            start: "top top",
            end: "bottom+=150% center",
            scrub: true,
            pin: true,
          },
        });

        tl2.to(blobRendersRef.current, { baseRadius: 10, })
          .to(flowTxtEls[flowTxtLeng - 1], {opacity: 0}, "<")
      });

    }

    ScrollTrigger.refresh();

  }, [introStatus]);

  return (
    <section id="visual" className="visual-sec" ref={visualSec}>
      <div className={`canvas-image-wrap ${!introStatus ? "active" : ""}`} ref={blobWrapRef}>
        <Canvas gl={{ alpha: true, version: 1 }} key={pathname}>
          <ClearColorUpdater isLight={isLight} blobRendersRef={blobRendersRef} />
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
          <MeshBlob position={initPos} ref={setBlobRef} blobRendersRef={blobRendersRef} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1.5} position={[0, 2, 2]} />
          <Environment preset="city" background={false} />
          <Leva hidden />
          <OrbitControls enableZoom={false} />
        </Canvas>

      </div>
      <div className="txt-wrap-area">
        <div className="txt-wrap" ref={topRef}>
          {text.map((txt, index) => (
            <h2 className={`visual-txt`} ref={(el) => (motionRef.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
        <div className="txt-wrap second" ref={bottomRef}>
          {text2.map((txt, index) => (
            <h2 className={`visual-txt`} ref={(el) => (motionRef2.current[index] = el)} key={index}>{txt}</h2>
          ))}
        </div>
        <div className="scroll-down" ref={scrollDownRef}>[ SCROLL DOWN ]</div>
      </div>
      <ul className="flow-txt-wrap">
        <li className="flow-txt" ref={(el) => (triggerRef.current[0] = el)}>
          <p className="txt" ref={(el) => (flowRef.current[0] = el)}>
            <span className="sub-tit">BLOP</span>
            <span className="strong">'Blob'</span> 은 물방울 같은 덩어리를 의미하지만, 인터랙션, 변형, 감성을 담아내는 시각적 표현으로 사용됩니다.<br />
            저의 성 'Park' 더해 끊임없이 스스로를 변형하고, 기술과 감각 사이를 넘나드는 존재로서의 방향성을 담았습니다.
          </p>
          <p className="left-bg bg-txt" ref={(el) => (bgLeftRef.current[0] = el)}>BLOB</p>
          <p className="right-bg bg-txt" ref={(el) => (bgRightRef.current[0] = el)}>PARK</p>
        </li>

        <li className="flow-txt" ref={(el) => (triggerRef.current[1] = el)}>
          <p className="txt" ref={(el) => (flowRef.current[1] = el)}>
            단순한 시각적 연출을 넘어, 시맨틱 구조와 웹 접근성을 바탕으로 누구에게나 이해되고, 도달할 수 있는 흐름을 설계합니다. <br />
            이는 메시지가 사용자에게 일관되고 명확하게 전달되도록 돕습니다.
          </p>
          <p className="left-bg bg-txt" ref={(el) => (bgLeftRef.current[1] = el)}>ACCESSIBILITY</p>
          <p className="right-bg bg-txt" ref={(el) => (bgRightRef.current[1] = el)}>SEMANTICS</p>
        </li>

        <li className="flow-txt show" ref={(el) => (triggerRef.current[2] = el)}>
          <p className="txt" ref={(el) => (flowRef.current[2] = el)}>
            고정된 틀보다는 맥락에 따라 유동적으로 반응할 수 있는 사고와 표현을 추구합니다. 화면이 상황에 따라 자연스럽게 흘러가듯, 방향성을 가지고 일합니다.
          </p>
        </li>
      </ul>
    </section>
  );
}
