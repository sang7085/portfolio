// import { shaderMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// const vertexShader = `
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;

// const fragmentShader = `
// uniform vec2 uMouse;
// uniform float uTime;
// varying vec2 vUv;

// void main() {
//   float dist = distance(vUv, uMouse);
//   float ripple = sin(dist * 40.0 - uTime * 3.0) * 0.01;
//   float alpha = smoothstep(0.3, 0.0, dist + ripple);
//   vec3 color = vec3(0.9, 0.9, 0.95);
//   gl_FragColor = vec4(color, alpha);
// }`;

// export const InkMaterial = shaderMaterial(
//   {
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uTime: 0,
//   },
//   vertexShader,
//   fragmentShader
// );
