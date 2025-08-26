import workData from "@/data/workData";
import { useEffect, useRef } from "react";
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
      const imgWrap = document.querySelectorAll(".img-wrap");
      const workListLeng = workList.length;
      txtMotion.current = []

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

      gsap.to(txtMotionWrap.current, {
        scrollTrigger: {
          trigger: txtMotionWrap.current,
          start: "top +=9%",
          end: "bottom top+=9%",
          pin: true,
        }
      })

      // matchmedia 간소화
      const getRadius = () => {
        const w = window.innerWidth;
        if (w < 480) return { leave: 0.8, back: 7 };
        if (w < 768) return { leave: 1, back: 7 };
        if (w < 1024) return { leave: 1.2, back: 10 };
        if (w <= 1440) return { leave: 1.2, back: 10 };
        return { leave: 1.5, back: 10 };
      };
      // 객체 구조분해 할당
      const { leave } = getRadius();
      const { back } = getRadius();

      workList.forEach((el, index) => {
        if (index !== workListLeng - 1) {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
              scrub: 1,
              invalidateOnRefresh,
              onLeave() {
                gsap.to(blobRendersRef.current, { baseRadius: leave });
              },
              onEnterBack() {
                gsap.to(blobRendersRef.current, { baseRadius: back });
              },
            },
          });
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
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [introStatus, router]);


  return (
    <>
      <section id="work" className="work-sec" ref={workSecRef} aria-labelledby="work-heading">
        <h2 id="work-heading" className="sr-only">works</h2>
        <div className="inner">
          <div className="slide-tit-wrap" ref={slideTitWrap}>
            <h3 className="slide-tit left" ref={slideTitLeft}>FEATURED</h3>
            <h3 className="slide-tit right" ref={slideTitRight}>WORKS</h3>
          </div>
          <div className="work-list-wrap">
            {workData.map((work, index) => (
              <div className={`work-list`} key={work.id}>
                <Link href={`/work/${work.slug}`} className="content-wrap" aria-labelledby={`${work.title}-자세히보기`} onClick={(e) => {
                  e.preventDefault();
                  transitionTo(`/work/${work.slug}`)
                }}>
                  <div className="info">
                    <div className="img-wrap">
                      <Image src={work.thumbnail} className="thumbnail" alt="" fill style={{ objectFit: "cover" }} loading="lazy" />
                    </div>
                    {/* {work.awards && (
                    <div className="awards">
                      <Image src={work.awards} alt="수상" fill style={{ objectFit: "cover" }} loading="lazy" />
                    </div>
                  )} */}
                    <div className="detail">
                      <div className="title-wrap">
                        <p className="title-num">({work.num})</p>
                        <h3 className="title">{work.titleKr}</h3>
                        {/* <p className="role-txt">{work.roles}</p> */}
                        <p className="description">{work.description.head}</p>
                      </div>
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