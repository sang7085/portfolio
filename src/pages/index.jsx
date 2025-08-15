import { useEffect, useState, useRef } from "react";
import IntroComp from "../components/IntroComp";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis"


// canvas나 webGl을 사용하기 위해 ssr 비활성화
// https://hyuns-it.tistory.com/103
const VisualComp = dynamic(() => import("../components/VisualComp"), { ssr: false });
const AboutMeComp = dynamic(() => import("../components/AboutMeComp"), { ssr: false });
const WorkComp = dynamic(() => import("../components/WorkComp"), { ssr: false });

export default function Home({ introStatus, setIntroStatus, isLight, transitionTo }) {
  const blobRendersRef = useRef({ blobFreq: 1, surfaceFreq: 1, color: "black", rotate: false, baseRadius: 1.5, });
  const [visualReady, setVisualReady] = useState(false);
  useEffect(() => {
    // scrollTrigger와 lenis 연동
    const { gsap } = require("gsap");
    const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      anticipatePin: 1,
      // markers: false, // 필요하면 전역 기본값도 여기서
    });

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    })

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, [])

  return (
    <>
      {introStatus && <IntroComp setIntroStatus={setIntroStatus} />}
      <VisualComp introStatus={introStatus} isLight={isLight} blobRendersRef={blobRendersRef} setVisualReady={setVisualReady} />
      {visualReady &&
        <>
          <WorkComp introStatus={introStatus} transitionTo={transitionTo} blobRendersRef={blobRendersRef} />
          <AboutMeComp introStatus={introStatus} isLight={isLight} />
        </>
      }
    </>
  );
}
