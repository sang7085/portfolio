import { useEffect, useState } from "react";
import IntroComp from "../components/IntroComp";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis"


// canvas나 webGl을 사용하기 위해 ssr 비활성화
// https://hyuns-it.tistory.com/103
// const HeaderComp = dynamic(() => import("../components/HeaderComp"), { ssr: false });
const VisualComp = dynamic(() => import("../components/VisualComp"), { ssr: false });
const AboutMeComp = dynamic(() => import("../components/AboutMeComp"), { ssr: false });
const WorkComp = dynamic(() => import("../components/WorkComp"), { ssr: false });

export default function Home({ introStatus, setIntroStatus, isLight, transitionTo }) {

    useEffect(() => {
    // scrollTrigger와 lenis 연동
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { gsap } = require("gsap");
    gsap.registerPlugin(ScrollTrigger);

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
      <VisualComp introStatus={introStatus} isLight={isLight} />
      <WorkComp introStatus={introStatus} transitionTo={transitionTo} />
      <AboutMeComp introStatus={introStatus} isLight={isLight} />
    </>
  );
}
