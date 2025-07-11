// "use client";

// import { extend, useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { InkMaterial } from "../shaders/inkShader";

// extend({ InkMaterial });

// export function InkCanvas() {
//   const matRef = useRef();
//   const { size } = useThree();

//   const handleMouseMove = (event) => {
//     if (matRef.current) {
//       const mouseX = event.clientX / window.innerWidth;
//       const mouseY = 1 - event.clientY / window.innerHeight; // Y축 보정
//       // ✅ 반드시 .value로 접근
//       matRef.current.uniforms.uMouse.value = new THREE.Vector2(mouseX, mouseY);
//       // ✅ 콘솔 확인
//       console.log("Mouse UV:", mouseX.toFixed(3), mouseY.toFixed(3));
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useFrame(({ clock }) => {
//     if (matRef.current) {
//       matRef.current.uniforms.uTime.value = clock.getElapsedTime();
//     }
//   });

//   return (
//     <mesh>
//       <planeGeometry args={[size.width, size.height]} />
//       <inkMaterial ref={matRef} transparent={true} />
//     </mesh>
//   );
// }
