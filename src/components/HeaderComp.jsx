import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from 'next/router';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin);
CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

export default function HeaderComp({ introStatus, setIsLight, isLight, transitionTo }) {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isWorkDetail = router.pathname === '/work/[slug]';
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const target = document.querySelector(href);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: target,
        offsetY: 100,
      },
      ease: "gentleEase",
    });
  }

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("tr-light", isLight);
    body.classList.toggle("tr-dark", !isLight);
  }, [isLight]);

  return (
    <header className={`header ${isOpen ? "open" : ""}`}>
      <div className="logo-icon">
        <button className="logo" onClick={() => transitionTo("/")}>BLOP</button>
      </div>
      <div className="utils">
        <button
          className={`light-mode ${isLight ? "tr-dark" : "tr-light"}`}
          onClick={() => setIsLight(!isLight)}
        >
        </button>
      </div>
      {
        !isWorkDetail &&
        <ul className="nav">
          <li><a href="#visual" onClick={handleScroll}>Visual</a></li>
          <li><a href="#work" onClick={handleScroll}>Work</a></li>
          <li><a href="#about" onClick={handleScroll}>About Me</a></li>
          <li><a href="#footer" onClick={handleScroll}>Contact</a></li>
        </ul>
      }
      <button className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        열림
      </button>
    </header>
  );
}
