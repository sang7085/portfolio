import "@/styles/scss/main.scss";
import HeaderComp from "../components/HeaderComp";
import FooterComp from "../components/FooterComp";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis"
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const cursorRef = useRef(null);
  const [introStatus, setIntroStatus] = useState(true);
  const [isLight, setIsLight] = useState(true);
  const router = useRouter();

  // lenis, scrollTrigger, scrollRestoration
  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.1 });
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { gsap } = require("gsap");
    gsap.registerPlugin(ScrollTrigger);

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // work나 본 페이지 진입 시 스크롤 위치 복원
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    return () => {
      lenis.destroy();
      history.scrollRestoration = "auto";
    };
  }, [])

  // cursor
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    bindCursorHover();

    // 라우터 이동시 커서함수 실행
    const handleRouteChangeComplete = () => bindCursorHover();
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    // 새로고침 시 커서함수 다시 실행
    if (!introStatus) {
      bindCursorHover();
    }

    // 새로고침 시 인트로 스킵
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    if (navType === "reload") {
      setIntroStatus(false);
    }

    // 뒤로가기 시 화면전환 animation 진행
    router.beforePopState(({ as }) => {
      transitionTo(as);
      return false;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [introStatus]);

  // work 화면전환 animation
  const transitionTo = (href) => {
    const cover = document.querySelector(".transition-cover");
    const tl = gsap.timeline({});
    tl.to(cover, {
      top: "0%",
      scale: 2,
      duration: 1,
      ease: "power2.out",
    })
      .add(() => {
        router.push(href);
      })
      .to(cover, {
        top: "100%",
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
  };

  // 라우터 이동시 버튼, a 태그 hover 이벤트
  const bindCursorHover = () => {
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorRef.current?.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursorRef.current?.classList.remove("hover");
      });
    });
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/images/favicon.png" />
      </Head>
      <a href="#main-content" className="skip-link">SKIP</a>
      <div className="cursor" ref={cursorRef}>
        <div className="click">CLICK</div>
      </div>
      {!introStatus && (
        <>
          <HeaderComp
            introStatus={introStatus}
            isLight={isLight}
            setIsLight={setIsLight}
            transitionTo={transitionTo}
          />
        </>
      )}
      <main id="main-content" tabIndex="-1">
        <Component
          {...pageProps}
          introStatus={introStatus}
          setIntroStatus={setIntroStatus}
          isLight={isLight}
          transitionTo={transitionTo}
        />
      </main>
      <FooterComp isLight={isLight} introStatus={introStatus} />

      <div className="transition-cover"></div>
    </>
  );
}
