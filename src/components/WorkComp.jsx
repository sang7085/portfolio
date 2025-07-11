import workData from "@/data/workData";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

export default function workComp({ introStatus, transitionTo }) {

  const router = useRouter();
  const workSecRef = useRef(null);
  const txtMotionWrap = useRef(null);
  const txtMotion = useRef([]);
  const slideTitWrap = useRef(null);
  const slideTitLeft = useRef(null);
  const slideTitRight = useRef(null);
  const text = "[WORKS]".split("");

  useEffect(() => {
    if (!introStatus) {
      const workList = document.querySelectorAll(".work-list");
      const workListLeng = workList.length;
      txtMotion.current = []

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideTitWrap.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      })

      tl.to(slideTitLeft.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" })
        .to(slideTitRight.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" }, "<")

      gsap.to(txtMotionWrap.current, {
        scrollTrigger: {
          trigger: txtMotionWrap.current,
          start: "top +=9%",
          end: "bottom top+=9%",
          pin: true,
        }
      })

      document.querySelectorAll(".content-wrap").forEach((wrap) => {
        const workList = wrap.closest(".work-list");
        const detail = workList.querySelector(".detail");

        wrap.addEventListener("mouseenter", () => {
          detail.classList.add("active");
          console.log("Fsdfss")
        });

        wrap.addEventListener("mouseleave", () => {
          detail.classList.remove("active");
        });
      });
    }
  }, [introStatus, router]);


  return (
    <>
      <section id="work" className="work-sec" ref={workSecRef}>
        <div className="inner">
          <div className="slide-tit-wrap" ref={slideTitWrap}>
            <h3 className="slide-tit left" ref={slideTitLeft}>FEATURED</h3>
            <h3 className="slide-tit right" ref={slideTitRight}>WORKS</h3>
          </div>
          <div className="work-list-wrap">
            {workData.map((work, index) => (
              <div className="work-list" key={work.id}>
                <Link href={`/work/${work.slug}`} className="content-wrap" onClick={(e) => {
                  e.preventDefault();
                  transitionTo(`/work/${work.slug}`)
                }}>
                  <Image src={work.thumbnail} className="thumbnail" alt="썸네일" fill style={{ objectFit: "cover" }} />
                  {work.awards && (
                    <div className="awards">
                      <Image src={work.awards} alt="수상" fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                </Link>

                <div className="detail">
                  <h3 className="title">{work.titleKr}</h3>
                  <div className="tag-wrap">
                    <span className="tag">{work.tags[0]}</span>
                    <span className="tag">{work.tags[1]}</span>
                    {work.tags[2] && (
                      <span className="tag">{work.tags[2]}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}