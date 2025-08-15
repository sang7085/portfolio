// "use client";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { CustomEase } from "gsap/dist/CustomEase";

// // SSR에서 gsap와 같은 DOM 의존 코드가 실행 되면 오류발생 브라우저 환경에서만 실행
// if (typeof window !== "undefined") {
//   if (!gsap.core.globals().ScrollTrigger) {
//     gsap.registerPlugin(ScrollTrigger, CustomEase);
//   }

//   if (!CustomEase.get("gentleEase")) {
//     CustomEase.create("gentleEase", "M0,0 C0.25,0.1,0.25,1,1,1");
//   }
// }

// export { gsap, ScrollTrigger, CustomEase };