import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";


// This component is used to create a 3D experience using React Three Fiber
extend({ OrbitControls: OrbitControls })

const Experience = () => {

  // This hook is used to access the Three.js context
  const {camera, gl} = useThree();

  // This is a reference to the cube mesh
  const cubeRef = useRef();
  const groupRef = useRef();

  // This function is called on every frame render
  useFrame((state, delta) => 
  {
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0, 0, 0)

    cubeRef.current.rotation.y += delta * 0.5;
    // groupRef.current.rotation.y += delta * 0.5;
  });

  return (
    <>

      {/* This component is used to create orbit controls for the camera */}
      <orbitControls args={ [camera, gl.domElement] } />

      {/* This component is used to create a  lights */}
      <directionalLight position={[1, 2, 3]} intensity={1.5}  />
      <ambientLight intensity={0.5} />


      <group ref={groupRef}>

        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
        </mesh>

      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />

    </>
  );
};

export default Experience;
