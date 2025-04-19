import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { BallCollider, Physics } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.jsx";
import Effect from "./Effect.jsx";

export default function Experience() {
  const blockCount = useGame((state) => {
    return state.blocksCounts;
  });
  const bloackSeed = useGame((state) => {
    return state.bloackSeed;
  });

  return (
    <>
      <color args={["#0b0c10"]} attach="background" />

      <Perf position="top-left" />

      {/* <OrbitControls makeDefault /> */}

      <Physics>
        <Lights />

        <Level count={blockCount} seed={bloackSeed} />

        <Player />
      </Physics>

      <Effect />
    </>
  );
}
