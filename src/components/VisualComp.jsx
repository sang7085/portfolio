'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// images

const VisualComp = () => {

  const motionRef = useRef([]);
  const imgRef = useRef([]);

  const leftBallRef = useRef(null);
  const rightBallRef = useRef(null);

  useEffect(() => {

    gsap.set(motionRef.current, {
      y: 50,
      opacity: 0,
    });

    gsap.to(motionRef.current, {
      y: 0,
      opacity: 1,
      stagger: .1,
      ease: "quart.inOut",
    });

  }, []);

  const text = "PUBLISHING".split("");
  return (
    <>
      <section className="visual-section">
        <div className="visual-txt motion-txt-wrap">
          {text.map((letter, index) => {
            return (
              <div className="motion-txt" key={index} ref={(textMotion) => {motionRef.current.push(textMotion)}}>
                {letter}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default VisualComp;