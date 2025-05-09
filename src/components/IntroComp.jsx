'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 이미지 불러오기

const sortedImages = Array.from({ length: 27 }, (_, i) => {
  const num = String(i + 1);
  return `/assets/images/img-introo${num}.png`;
});

export default function IntroPage({ setIntroStatus }) {
  const posRef = useRef([]);
  const circleRef = useRef();

  useLayoutEffect(() => {
    gsap.set(posRef.current, {
      y: '-50%',
      x: '-50%',
    });

    gsap.set(circleRef.current, {
      top: '50%',
      left: '50%',
      y: '-50%',
      x: '-50%',
    });
  }, []);

  useEffect(() => {
    let i = 0;
    const imgMotion = setInterval(() => {
      const wraps = document.querySelectorAll('.intro-img-wrap');
      wraps.forEach((img) => {
        const imgs = img.querySelectorAll('.img-list');
        for (let k = 0; k < imgs.length; k++) {
          imgs[k].style.display = k === i ? 'block' : 'none';
        }
      });
      i = (i + 1) % 3;
    }, 100);

    const tl = gsap.timeline();
    tl.to({}, {
      duration: 2,
      onStart() {
        document.querySelector('.loading-txt').classList.add('active');
      },
      onComplete() {
        gsap.to('.loading-txt', {
          opacity: 0,
        });
      }
    })
      .to('.intro-area', {
        delay: 0.3,
        opacity: 1,
        duration: 0.2,
        onComplete() {
          gsap.to('.wide-circle', {
            opacity: 1,
          });
        }
      })
      .to({}, {
        duration: 2,
        opacity: 1,
        onComplete() {
          clearInterval(imgMotion);
          gsap.set('.img-list', { display: 'none' });
          gsap.set('.img-list:nth-child(3)', { display: 'block' });
        }
      })
      .to(posRef.current.filter((_, idx) => idx !== 4), {
        top: '50%',
        left: '50%',
        ease: 'rough',
        scale: 0.6,
        filter: 'blur(10px)',
        duration: 0.5,
        onComplete() {
          document.querySelector('.intro-img-wrap:nth-child(5)').classList.add('active');
          gsap.delayedCall(0.5, () => {
            setIntroStatus(false);
          });
        }
      }, '+=1');
  }, []);

  return (
    <div className="intro-sec">
      <div className="logo-loading">
        <p className="loading-txt" data-text="LOADING">LOADING</p>
      </div>
      <div className="intro-area">
        {Array.from({ length: 9 }).map((_, idx) => {
          const imgSlice = sortedImages.slice(idx * 3, idx * 3 + 3);
          return (
            <div className="intro-img-wrap" key={idx} ref={(el) => (posRef.current[idx] = el)}>
              {imgSlice.map((src, i) => (
                <div className="img-list" key={i}>
                  <img src={src} alt={`인트로 이미지 ${idx * 3 + i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="wide-circle" ref={circleRef}></div>
    </div>
  );
}
