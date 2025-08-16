"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function AboutMeComp({ introStatus, isLight }) {

  const wrapRef = useRef();
  const slideTitWrap = useRef(null);
  const slideTitLeft = useRef(null);
  const slideTitRight = useRef(null);

  useEffect(() => {
    if (!introStatus) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideTitWrap.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
      tl.to(slideTitLeft.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" })
        .to(slideTitRight.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" }, "<")
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [introStatus]);


  return (
    <>
      <section id="about" className="about-sec" ref={wrapRef} aria-labelledby="about-heading">
        <h2 id="about-heading" className="sr-only">About Me</h2>
        <div className="inner">
          <div className="slide-tit-wrap" ref={slideTitWrap}>
            <h3 className="slide-tit center left" ref={slideTitLeft}>MY</h3>
            <h3 className="slide-tit center right" ref={slideTitRight}>PROFILE</h3>
          </div>
          <div className="about-con">
            <div className={`txt-wrap`} ref={wrapRef}>
              <p className="txt-list">
                시맨틱 마크업을 기반으로 웹 접근성과 웹 표준을 철저히 준수하며, 남녀노소 누구나 불편 없이 이용할 수 있는 ‘차별 없는 웹’을 지향합니다.<br />
                <span className="pc-only">
                  퍼블리셔로서 단순히 시각적인 구현에 그치지 않고, 구조적인 의미와 사용자 경험을 함께 고려한 작업을 중요하게 생각합니다.<br />
                  CSS(SCSS), JavaScript, jQuery를 활용한 인터랙션 구현과 디테일한 퍼블리싱 작업에 흥미를 느끼며, 완성도 높은 UI를 만드는 데에 자부심을 가지고 있습니다.<br />
                </span>
                최근에는 정적인 마크업을 넘어 보다 동적인 사용자 경험을 제공하기 위해 next.js, React 등을 학습 중이고, 이를 통해 프론트엔드 개발자로서의 성장을 꾸준히 도모하고 있습니다.
                <br className="pc-only" />
                <span className="pc-only">
                  지금 이 순간에도 새로운 기술을 익히고, 더 나은 코드와 사용자 경험을 고민하며, 퍼블리셔 그 이상의 역할을 할 수 있는 프론트엔드 개발자가 되기 위해 한 걸음씩 나아가고 있습니다.
                </span>
              </p>
            </div>
            <div className="detail-wrap">
              <Image src="/assets/images/my-face.jpg" alt="프로필사진" fill loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}