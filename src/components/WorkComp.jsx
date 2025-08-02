import workData from "@/data/workData";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { useRouter } from "next/router";


export default function workComp({ introStatus, transitionTo, blobRendersRef }) {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

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
          end: "bottom center",
          scrub: true,
          // markers: true,
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
        const title = workList.querySelector(".title");

        wrap.addEventListener("mouseenter", () => {
          detail.classList.add("active");
          title.classList.add("active");
        });

        wrap.addEventListener("mouseleave", () => {
          detail.classList.remove("active");
          title.classList.remove("active");
        });
      });

      document.querySelectorAll(".work-list").forEach((el) => {
        const titleEl = el.querySelector(".title");
        const titleW = el.querySelector(".title-wrap");
        const imgW = el.querySelector(".img-wrap");

        gsap.to(titleW, {
          y: "-5%",
          ease: "gentleEase",
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            onLeave: () => {
              gsap.to(blobRendersRef.current, { baseRadius: 1.5 });
            },
            onEnterBack: () => {
              gsap.to(blobRendersRef.current, { baseRadius: 10 });
            },
          },
        })

        gsap.to(titleEl, {
          y: 0,
          opacity: 1,
          ease: "gentleEase",
          duration: 2,
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
          }
        })

        gsap.to(imgW, {
          scale: 1,
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom bottom",
          }
        })
      })
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
              <div className={`work-list ${index % 2 === 0 ? "right" : "left"}`} key={work.id}>
                <Link href={`/work/${work.slug}`} className="content-wrap" onClick={(e) => {
                  e.preventDefault();
                  transitionTo(`/work/${work.slug}`)
                }}>
                  <div className="img-wrap">
                    <Image src={work.thumbnail} className="thumbnail" alt="썸네일" fill style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                  {work.awards && (
                    <div className="awards">
                      <Image src={work.awards} alt="수상" fill style={{ objectFit: "cover" }} loading="lazy" />
                    </div>
                  )}
                  <div className="detail">
                    <p className="title-num">({work.num})</p>
                    <div className="title-wrap">
                      <h3 className="title">{work.titleKr}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}