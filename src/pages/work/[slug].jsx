import workData from "@/data/workData";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function WorkList({ transitionTo }) {
  
  const slideTitWrap = useRef(null);
  const slideTitLeft = useRef(null);
  const slideTitRight = useRef(null);

  const slideTitWrap2 = useRef(null);
  const slideTitLeft2 = useRef(null);
  const slideTitRight2 = useRef(null);


  const slideTitWrap3 = useRef(null);
  const slideTitLeft3 = useRef(null);
  const slideTitRight3 = useRef(null);

  const visualWrap = useRef(null);
  const visualImg = useRef(null);
  const router = useRouter();
  const { slug } = router.query;
  const work = workData.find(w => w.slug === slug);

  // 다음 버튼
  const currentIndex = workData.findIndex(w => w.slug === slug);
  const nextIndex = (currentIndex + 1) % workData.length;
  const nextWork = workData[nextIndex];



  useEffect(() => {

    if (!router.isReady || !work) return;

    // 뒤로가기 시 스크롤 bottom 억제
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);


    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

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

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: slideTitWrap2.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    })

    tl2.to(slideTitLeft2.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" })
      .to(slideTitRight2.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" }, "<")

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: slideTitWrap3.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    })

    tl3.to(slideTitLeft3.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" })
      .to(slideTitRight3.current, { x: 0, backgroundPositionX: "0%", ease: "gentleEase" }, "<")

    gsap.to(visualImg.current, {
      y: "10%",
      scrollTrigger: {
        trigger: visualWrap.current,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      }
    })

    ScrollTrigger.refresh();

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };


  }, [router.isReady])

  if (!router.isReady || !work) return null; // 새로고침 오류 방지

  return (
    <>
      <div className="work-container">
        <div className="inner">
          <div className="slide-tit-wrap" ref={slideTitWrap}>
            <h3 className="slide-tit left" ref={slideTitLeft}>{work.slideTitle.left}</h3>
            <h3 className="slide-tit right" ref={slideTitRight}>{work.slideTitle.right}</h3>
          </div>
          <ul className="work-head">
            <li>
              <div className="head-tit">
                <h3>Client</h3>
              </div>
              <div className="head-txt">
                <p>{work.client}</p>
              </div>
            </li>
            <li>
              <div className="head-tit">
                <h3>Roles</h3>
              </div>
              <div className="head-txt">
                <p>{work.roles.join(", ")}</p>
              </div>
            </li>
            <li>
              <div className="head-tit">
                <h3>Year</h3>
              </div>
              <div className="head-txt">
                <p>{work.year}</p>
              </div>
            </li>
            <li>
              <div className="head-tit">
                <h3>URL</h3>
              </div>
              <div className="head-txt">
                <Link href={`${work.url}`} target="_blank" role="새창열림">{work.url}</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-wrap">
          <div className="visual-wrap" ref={visualWrap}>
            <div className="fake-bg" style={{ backgroundImage: `url(${work.visual})` }} role="img" aria-label={work.visualAlt}></div>
          </div>
          <div className="about-project">
            <div className="inner">
              <div className="tit-wrap">
                <h3 className="tit">About Project</h3>
                <div className="info">
                  <div className="info-head">
                    <p>{work.description.head}</p>
                  </div>
                  <div className="info-body">
                    <p className="txt">{work.description.body[0]}</p>
                    <p className="txt">{work.description.body[1]}</p>
                    <p className="txt">{work.description.body[2]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uiux-wrap">
          <div className="inner">
            <div className="slide-tit-wrap" ref={slideTitWrap2}>
              <h3 className="slide-tit left" ref={slideTitLeft2}>UI UX</h3>
              <h3 className="slide-tit right" ref={slideTitRight2}>VIEWS</h3>
              <h3 className="sub-tit">Crafting Experiences, Visual Showcase</h3>
            </div>
          </div>
          <div className="content-wrap">
            <div className="visual-wrap" ref={visualWrap}>
              <div className="inner">
                {work.videoUrl && (
                  <div className="video-con">
                    <video src={work.videoUrl} autoPlay muted loop playsinline></video>
                  </div>
                )}
                {work.imgList && (
                  <>
                    <div className="scroll">[ SCROLL ]</div>
                    <div className="img-con">
                      <div className="scroll-wrap" data-lenis-prevent>
                        <Image src={work.imgList} className="img-list" alt="상세페이지" fill style={{ objectFit: "cover" }} loading="lazy" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="next-work">
          <div className="inner">
            <button className="next-work-btn" onClick={() => transitionTo(`/work/${nextWork.slug}`)}>
              <div className="slide-tit-wrap" ref={slideTitWrap3}>
                <h3 className="slide-tit center left" ref={slideTitLeft3}>GO TO THE</h3>
                <h3 className="slide-tit center right" ref={slideTitRight3}>NEXT WORK</h3>
              </div>
              <div className="arrow">
                <svg width="55" height="81" viewBox="0 0 55 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="27.5" y1="1" x2="27.5" y2="81" stroke="var(--darkColor)"></line>
                  <line x1="27.3536" y1="0.646447" x2="54.3536" y2="27.6464" stroke="var(--darkColor)"></line>
                  <line y1="-0.5" x2="38.1838" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 28 1)" stroke="var(--darkColor)"></line>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}