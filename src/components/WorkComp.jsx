import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import workImg from "../../public/assets/images/work-01-test.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';

// font
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

//easing
gsap.registerPlugin(ScrollTrigger, CustomEase);


export default function workComp({ introStatus }) {

  const txtMotionWrap = useRef([]);
  const titRef = useRef([]);
  const txtMotion = useRef([]);
  const imgWrapMotion = useRef([]);
  const text = "WORKS".split("");


  useEffect(() => {
    <s></s>
    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

    if (!introStatus) {
      const workList = document.querySelectorAll(".work-list");
      const workListLeng = workList.length;

      // 텍스트 페이드인
      gsap.to(txtMotion.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "gentleEase",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".work-sec",
          start: "-=30% top",
          end: "bottom bottom",
        }
      });

      workList.forEach((el, index) => {
        if (index === 0) return;

        // gsap.to(el, {
        //   top: 0,
        //   ease: "gentleEase",
        //   scrollTrigger: {
        //     trigger: ".work-list-con",
        //     start: `top top`,
        //     end: `${index * 100}% bottom`,
        //     scrub: true,
        //     markers: true,
        //   }
        // });
      });
    }
  }, [introStatus]);


  return (
    <>
      <section className="work-sec">
        <div className="work-tit-wrap" ref={txtMotionWrap}>
          {text.map((txt, index) => (
            <h2 className={`work-tit ${anton.className}`} key={index} ref={(el) => (txtMotion.current[index] = el)}>{txt}</h2>
          ))}
          {/* <h2 className={`work-tit ${anton.className}`} ref={titRef}>FEATURED WORKS</h2> */}
        </div>
        <div className="work-list-con">
          <div className="work-list-wrap" ref={imgWrapMotion}>
            <a href="javascript:" className="work-list first">
              <Image src={workImg} alt="로고" />
            </a>
            <a href="javascript:" className="work-list">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}