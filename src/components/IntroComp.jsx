'use client';

// font
import { Anton } from "next/font/google";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(CustomEase);
const anton = Anton({ subsets: ["latin"], weight: ["400"] });



// // 이미지 불러오기

// const sortedImages = Array.from({ length: 27 }, (_, i) => {
//   const num = String(i + 1);
//   return `/assets/images/img-introo${num}.png`;
// });

// export default function IntroPage({ setIntroStatus }) {
//   const posRef = useRef([]);
//   const circleRef = useRef();

//   useLayoutEffect(() => {
//     gsap.set(posRef.current, {
//       y: '-50%',
//       x: '-50%',
//     });  

//     gsap.set(circleRef.current, {
//       top: '50%',
//       left: '50%',
//       y: '-50%',
//       x: '-50%',
//     });
//   }, []);

//   useEffect(() => {
//     let i = 0;
//     const imgMotion = setInterval(() => {
//       const wraps = document.querySelectorAll('.intro-img-wrap');
//       wraps.forEach((img) => {
//         const imgs = img.querySelectorAll('.img-list');
//         for (let k = 0; k < imgs.length; k++) {
//           imgs[k].style.display = k === i ? 'block' : 'none';
//         }
//       });
//       i = (i + 1) % 3;
//     }, 100);

//     const tl = gsap.timeline();
//     tl.to({}, {
//       duration: 2,
//       onStart() {
//         document.querySelector('.loading-txt').classList.add('active');
//       },
//       onComplete() {
//         gsap.to('.loading-txt', {
//           opacity: 0,
//         });
//       }
//     })
//       .to('.intro-area', {
//         delay: 0.3,
//         opacity: 1,
//         duration: 0.2,
//         onComplete() {
//           gsap.to('.wide-circle', {
//             opacity: 1,
//           });
//         }
//       })
//       .to({}, {
//         duration: 2,
//         opacity: 1,
//         onComplete() {
//           clearInterval(imgMotion);
//           gsap.set('.img-list', { display: 'none' });
//           gsap.set('.img-list:nth-child(3)', { display: 'block' });
//         }
//       })
//       .to(posRef.current.filter((_, idx) => idx !== 4), {
//         top: '50%',
//         left: '50%',
//         ease: 'rough',
//         scale: 0.6,
//         filter: 'blur(10px)',
//         duration: 0.5,
//         onComplete() {
//           document.querySelector('.intro-img-wrap:nth-child(5)').classList.add('active');
//           gsap.delayedCall(0.5, () => {
//             setIntroStatus(false);
//           });
//         }
//       }, '+=1');
//   }, []);

//   return (
//     <div className="intro-sec">
//       <div className="logo-loading">
//         <p className="loading-txt" data-text="LOADING">LOADING</p>
//       </div>
//       <div className="intro-area">
//         {Array.from({ length: 9 }).map((_, idx) => {
//           const imgSlice = sortedImages.slice(idx * 3, idx * 3 + 3);
//           return (
//             <div className="intro-img-wrap" key={idx} ref={(el) => (posRef.current[idx] = el)}>
//               {imgSlice.map((src, i) => (
//                 <div className="img-list" key={i}>
//                   <img src={src} alt={`인트로 이미지 ${idx * 3 + i + 1}`} loading="lazy" />
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//       <div className="wide-circle" ref={circleRef}></div>
//     </div>
//   );
// }


export default function IntroComp({setIntroStatus}) {

  useEffect(() => {
    CustomEase.create("bounceSmooth", "M0,0 C0.175, 0.885, 0.32, 1.275, 1,1");
    CustomEase.create("elasticSoft", "M0,0 C0.68,-0.55,0.265,1.55,1,1");
    CustomEase.create("smoothOvershoot", "M0,0 C0.34,1.56,0.64,1,1,1");
    CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

    const tl = gsap.timeline();
    const introTxtWrap = document.querySelector(".intro-txt-wrap");
    const piano = document.querySelectorAll(".intro-piano ");
    const introTxt = document.querySelectorAll('.intro-txt');

    tl.to(introTxtWrap, {
      y: 0,
      duration: .8,
      ease: 'gentleEase',
    })
    tl.to(introTxtWrap, {
      y: "-50px",
      duration: 1,
      delay: 2,
      ease: 'gentleEase',
    })
    tl.to(introTxtWrap, {
      y: "-100px",
      duration: 1,
      ease: 'gentleEase',
    })
    tl.to(introTxtWrap, {
      y: "-150px",
      duration: 1,
      ease: 'gentleEase',
    })
    tl.to(introTxtWrap, {
      opacity: 0,
      duration: 1,
      ease: 'gentleEase',
    })
    tl.to(piano, {
      height: "0",
      duration: .2,
      stagger: .1,
      ease: 'gentleEase',
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
        </div>
        <div className="intro-txt-con">
          <div className="intro-txt-wrap">
            <div className={`intro-txt ${anton.className}`}>HELLO!</div>
            <div className={`intro-txt ${anton.className}`}>INTERACTIVE</div>
            <div className={`intro-txt ${anton.className}`}>PUBLISHING</div>
            <div className={`intro-txt ${anton.className}`}>DEVELOP</div>
          </div>
        </div>
      </section>
    </>
  )
}