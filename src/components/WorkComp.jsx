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

  const workSecRef = useRef([]);
  const txtMotionWrap = useRef([]);
  const txtMotion = useRef([]);
  const imgWrapMotion = useRef([]);
  const text = "[WORKS]".split("");


  useEffect(() => {

    if (!introStatus) {
      CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");
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

      gsap.to(txtMotionWrap.current, {
        scrollTrigger: {
          trigger: txtMotionWrap.current,
          start: "top +=9%",
          end: "bottom top+=9%",
          pin: true,
        }
      })

      gsap.to(workSecRef.current, {
        backgroundColor: "#000",
        scrollTrigger: {
          trigger: workSecRef.current,
          start: "top 50%",
          end: "bottom bottom",
          markers: true,
          scrub: 1,
        }
      })

      workList.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          ease: "gentleEase",
          scrollTrigger: {
            trigger: el,
            start: "top +=30%",
            end: "bottom bottom",
          }
        })
      })

    }
  }, [introStatus]);


  return (
    <>
      <section className="work-sec" ref={workSecRef}>
        <div className="work-tit-wrap" ref={txtMotionWrap}>
          {text.map((txt, index) => (
            <h2 className={`work-tit`} key={index} ref={(el) => (txtMotion.current[index] = el)}>{txt}</h2>
          ))}
          {/* <h2 className={`work-tit ${anton.className}`} ref={titRef}>FEATURED WORKS</h2> */}
        </div>
        <div className="work-list-wrap" ref={imgWrapMotion}>
          <div className="work-list first">
            <div className="work-num">
              <span>(1)</span>
            </div>
            <div className="work-list-tit">
              <span>HD Hyundai</span>
            </div>
            <a href="javascript:" className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
          <div className="work-list">
            <div className="work-num">
              <span>(2)</span>
            </div>
            <div className="work-list-tit">
              <span>삼성화재</span>
            </div>
            <div className="work-list-txt">
              <p></p>
            </div>
            <a href="javascript:" className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
          <div className="work-list">
            <div className="work-num">
              <span>(3)</span>
            </div>
            <div className="work-list-tit">
              <span>삼성화재</span>
            </div>
            <a href="javascript:" className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}