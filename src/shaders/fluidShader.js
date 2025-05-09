// import { shaderMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   uniform vec2 uMouse;
//   uniform float uTime;
//   varying vec2 vUv;

//   void main() {
//     vec2 p = vUv;
//     float d = distance(p, uMouse);
//     float ripple = sin(10.0 * d - uTime * 3.0) * 0.01;
//     vec2 distortedUV = p + normalize(p - uMouse) * ripple;
//     gl_FragColor = texture2D(uTexture, distortedUV);
//   }
// `;

// export const FluidMaterial = shaderMaterial(
//   {
//     uTexture: null,
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uTime: 0,
//   },
//   vertexShader,
//   fragmentShader
// );
