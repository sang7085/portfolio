import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, OrthographicCamera, OrbitControls, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

//resisterPlugin
gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin);
CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");

export default function FooterComp() {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="contact-txt">
          <h2>CONTACT</h2>
        </div>
        <div className="contact-wrap">
          <div className="contact-info">
            <div className="phone-num">
              <a href="tel:+821068997085" aria-label="전화 걸기 010-6899-7085">TEL: 010-6899-7085</a>
            </div>
            <div className="email">
              <a href="mailto:sang7085@gmail.com" aria-label="이메일 보내기 sang7085@gmail.com">Email: sang7085@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
