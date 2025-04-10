import { OrbitControls } from "@react-three/drei";
import { useControls, button, folder } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { perfVisible } = useControls("perf", {
    perfVisible: false,
  });

  const { position, color, visible } = useControls("sphere", {
    position: {
      value: -2,
      min: -5,
      max: 5,
      step: 0.01,
    },
    color: "#ff0000",
    visible: true,
    myInterval: {
      value: [4, 5],
      min: 0,
      max: 10,
    },
    clickMe: button(() => {
      console.log("Clicked!");
    }),
    choice: {
      options: ["a", "b", "c"],
      value: "a",
    },
  });

  const { cubeScale } = useControls("cube", {
    cubeScale: {
      value: 1.5,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  return (
    <>
      {
        perfVisible ? <Perf position="top-left" /> : null
      }

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={position} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={cubeScale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
