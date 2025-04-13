import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture("803537_310F10_C35A5D_D89093", 256);

  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* Tours */}
      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} /> */}
      {/* Material */}
      {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />  */}

      {/* Text */}
      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          React 3 Fiber
        </Text3D>
      </Center>

      {/* Tours */}
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => {
            donuts.current[index] = element;
          }}
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
