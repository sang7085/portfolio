"use client";

// font
import { Anton } from "next/font/google";
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function IntroComp({setIntroStatus}) {

  useEffect(() => {
    CustomEase.create("bounceSmooth", "M0,0 C0.175, 0.885, 0.32, 1.275, 1,1");
    CustomEase.create("elasticSoft", "M0,0 C0.68,-0.55,0.265,1.55,1,1");
    CustomEase.create("smoothOvershoot", "M0,0 C0.34,1.56,0.64,1,1,1");
    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

    const tl = gsap.timeline();
    const introTxtWrap = document.querySelector(".intro-txt-wrap");
    const piano = document.querySelectorAll(".intro-piano ");
    const introTxt = document.querySelectorAll(".intro-txt");

    tl.to(introTxtWrap, {
      y: 0,
      duration: .8,
      ease: "gentleEase",
    })
      .to(introTxtWrap, {
      y: "-5rem",
      duration: 1,
      delay: 2,
      ease: "gentleEase",
    })
      .to(introTxtWrap, {
      y: "-10rem",
      duration: 1,
      ease: "gentleEase",
    })
      .to(introTxtWrap, {
      y: "-15rem",
      duration: 1,
      ease: "gentleEase",
    })
      .to(piano, {
      height: "0",
      duration: .2,
      stagger: .1,
      ease: "gentleEase",
      onComplete() {
        setIntroStatus(false);
      }
    }, "+=.2");
  }, []);

  return (
    <>
      <section className="intro-sec">
      <div className="intro-piano-wrap">
        <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
          <div className="intro-piano"></div>
        </div>
        <div className="intro-txt-con">
          <div className="intro-txt-wrap">
            <div className={`intro-txt ${anton.className}`}>BLO + P</div>
            <div className={`intro-txt ${anton.className}`}>PUBLISHING</div>
            <div className={`intro-txt ${anton.className}`}>DEVELOP</div>
          </div>
        </div>
      </section>
    </>
  )
}