import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();
  const model = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const handleEvent = (event) => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 25%)`);
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.2} />

      <mesh position-x={-2} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={handleEvent}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        //   console.log("Pointer entered");
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        //   console.log("Pointer left");
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={model.scene}
        scale={0.25}
        position-y={0.8}
        onClick={(event) => {
            event.stopPropagation();
            console.log("Hamburger clicked");
            // console.log(event.object.name)
        }}
      />
    </>
  );
}
