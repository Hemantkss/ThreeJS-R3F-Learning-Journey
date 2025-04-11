import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  {
    /* Light Helper */
  }
  const directionallight = useRef();
  useHelper(directionallight, THREE.DirectionalLightHelper, 0.9);

  const cube = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  //   Debug Leva
  const { color, opacity, blur } = useControls("Contact Shadow", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  //   Sky
  const { sunPosition } = useControls("Sky", {
    sunPosition: {
      value: [1, 2, 3],
      step: 0.001,
      min: -10,
      max: 10,
    },
  });

  //   Environment
  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("Environment map", {
      envMapIntensity: {
        value: 7,
        min: 0,
        max: 10,
      },
      envMapHeight: {
        value: 7,
        min: 0,
        max: 100,
      },
      envMapRadius: {
        value: 28,
        min: 0,
        max: 1000,
      },
      envMapScale: {
        value: 100,
        min: 10,
        max: 1000,
      },
    });

  return (
    <>
      {/* // Environment */}
      {/* <Environment
        // background
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        // ground={{
        //   height: envMapHeight,
        //   radius: envMapRadius,
        //   scale: envMapScale,
        // }}
        // // preset="sunset"
      > */}
      {/* <color args={["#000000"]} attach="background" /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial
            color={[10, 0, 0]}
          />
        </mesh> */}
      {/* <Lightformer position-z={-5} scale={10} color="red" intensity={10} form='ring' /> */}
      {/* </Environment> */}

      {/* Background Color */}
      {/* <color args={["ivory"]} attach="background" /> */}
      {/* Sky */}
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* BakeShadows  not help to moving object*/}
      {/* <BakeShadows /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* AccumulativeShadows */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          intensity={1}
          ambient={0.5}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* ContactShadows */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}
      {/* <directionalLight
        ref={directionallight}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} /> */}
      {/* <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh castShadow ref={cube} position-y={1} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      <Stage
        ContactShadows={{ opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh castShadow ref={cube} position-y={1} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
