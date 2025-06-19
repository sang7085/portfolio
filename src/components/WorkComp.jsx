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

  const workSecRef = useRef(null);
  const txtMotionWrap = useRef(null);
  const txtMotion = useRef([]);
  const imgWrapMotion = useRef(null);
  const text = "[WORKS]".split("");


  useEffect(() => {

    if (!introStatus) {
      CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");
      const workList = document.querySelectorAll(".work-list");
      const workListLeng = workList.length;
      txtMotion.current = []

      // 텍스트 페이드인
      gsap.to(txtMotion.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "gentleEase",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".work-sec",
          start: "top top",
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

      // workList.forEach((el, i) => {
      //   console.log(i);
      //   gsap.to(el, {
      //     y: 0,
      //     opacity: 1,
      //     ease: "gentleEase",
      //     scrollTrigger: {
      //       trigger: el,
      //       start: "top center",
      //       end: "bottom bottom",
      //       markers: true,
      //     }
      //   })
      // })
      workList.forEach((el, i) => {
        const contentWrap = el.querySelector(".content-wrap");
        gsap.set(contentWrap, { scale: 0, y: "-50%", x: "-50%" })
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom+=50% bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
          markers: true,
          anticipatePin: 1
        });

        gsap.to(contentWrap, {
          scale: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

      })

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };

    }
  }, [introStatus]);


  return (
    <>
      <section className="work-sec" ref={workSecRef}>
        {/* <div className="work-tit-wrap" ref={txtMotionWrap}>
          {text.map((txt, index) => (
            <h2 className={`work-tit`} key={index} ref={(el) => (txtMotion.current[index] = el)}>{txt}</h2>
          ))}
        </div> */}
        {/* <div className="work-list-wrap" ref={imgWrapMotion}>
          <div className="work-list first">
            <div className="work-num">
              <span>(1)</span>
            </div>
            <div className="work-list-tit">
              <span>HD HYUNDAI</span>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="content-wrap">
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
            <a href="#" onClick={(e) => e.preventDefault()} className="content-wrap">
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
            <a href="#" onClick={(e) => e.preventDefault()} className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
        </div> */}
        <div className="work-list-wrap">
          <div className="work-list">
            {/* <div className="work-num">
              <span>(3)</span>
            </div>
            <div className="work-list-tit">
              <span>삼성화재</span>
            </div> */}
            <a href="#" onClick={(e) => e.preventDefault()} className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
          <div className="work-list">
            {/* <div className="work-num">
              <span>(3)</span>
            </div>
            <div className="work-list-tit">
              <span>삼성화재</span>
            </div> */}
            <a href="#" onClick={(e) => e.preventDefault()} className="content-wrap">
              <Image src={workImg} alt="로고" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}