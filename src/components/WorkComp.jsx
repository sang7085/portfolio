import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// font
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function workComp({ introStatus }) {

  const txtMotion = useRef([]);
  const text = "FEATURED WORKS".split("");


  useEffect(() => {
    if (!introStatus) {

      gsap.to({}, {
        scrollTrigger: {
          trigger: ".work-sec",
          start: "top top",
          end: "+=300% bottom",
          markers: true,
          pin: true,
          onUpdate(self) {
            let titStatus = true;
            const progress = self.progress;
            if (progress > 0.1) {
              titStatus = false;
              if (!titStatus) {
                gsap.to(txtMotion.current, {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "gentleEase",
                  stagger: 0.05,
                  once: true,
                });
              }
            }
          }
        }
      })
    }
  }, [introStatus])

  return (
    <>
      <section className="work-sec">
        <div className="work-tit-wrap">
          {text.map((txt, index) => (
            <h2 className={`work-tit ${anton.className}`} key={index} ref={(el) => (txtMotion.current[index] = el)}>{txt}</h2>
          ))}
        </div>
      </section>
    </>
  )
}