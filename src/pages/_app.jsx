import "@/styles/scss/main.scss";
import HeaderComp from "../components/HeaderComp";
import FooterComp from "../components/FooterComp";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis"

export default function MyApp({ Component, pageProps }) {
  const cursorRef = useRef(null);
  const [introStatus, setIntroStatus] = useState(true);
  const [isLight, setIsLight] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    router.beforePopState(({ as }) => {
      transitionTo(as);
      return false;
    });

    return () => {
      router.beforePopState(() => true);
    };

  }, [router]);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    return () => {
      history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    if (!introStatus) {
      bindCursorHover();
    }

    const navType = performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "reload") {
      setIntroStatus(false);
    }
  }, [introStatus])

   useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      bindCursorHover();
    };

    bindCursorHover();

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
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
      <Component
        {...pageProps}
        introStatus={introStatus}
        setIntroStatus={setIntroStatus}
        isLight={isLight}
        transitionTo={transitionTo}
      />
      <FooterComp />
      <div className="cursor" ref={cursorRef}>
        <div className="click">click</div>
      </div>
      <div className="transition-cover"></div>
    </>
  );
}
