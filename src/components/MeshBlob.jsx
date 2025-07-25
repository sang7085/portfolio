import * as THREE from "three";
import { forwardRef, useRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

const simplex = new SimplexNoise();

export default forwardRef(function BlobMesh({ position, blobRendersRef }, ref) {
  const meshRef = useRef();

  /* 외부에서 blobRef.current 로 mesh 접근 가능 */
  useImperativeHandle(ref, () => meshRef.current);

  // let frameCount = 0;
  useFrame(({ clock }) => {
    // frameCount++;
    // if (frameCount % 2 !== 0) return;
    const time = clock.getElapsedTime();
    const { blobFreq, surfaceFreq, color, rotate, baseRadius } =
      blobRendersRef.current;

    if (rotate) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.005;
    }

    const posAttr = meshRef.current.geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const norm = vertex.clone().normalize();

      const blobNoise =
        0.1 *
        simplex.noise3d(
          norm.x * blobFreq,
          norm.y * blobFreq,
          norm.z * blobFreq + time
        );

      const surfaceNoise =
        4 *
        simplex.noise3d(
          norm.x * surfaceFreq,
          norm.y * surfaceFreq,
          norm.z * surfaceFreq + time
        );

      vertex
        .copy(norm)
        .multiplyScalar(baseRadius + blobNoise + surfaceNoise * 0.01);

      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    if (meshRef.current.material && color) {
      meshRef.current.material.color = new THREE.Color(color);
    }

  });

  return (
    <mesh ref={meshRef} rotation={[-1.33, -0.13, -2.0]} position={position}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshPhysicalMaterial
        roughness={0.44}
        metalness={0.73}
        transmission={1}
        thickness={0.5}
        clearcoat={0.13}
        clearcoatRoughness={1}
        envMapIntensity={0.95}
        iridescence={0.4}
      />
    </mesh>
  );
});
