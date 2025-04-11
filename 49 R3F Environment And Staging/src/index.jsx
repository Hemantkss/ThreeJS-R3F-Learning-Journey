import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// BackGround color
const created = ({ scene }) => {
  // state.gl.setClearColor('red', 0.3)
  scene.background = new THREE.Color("red");
};

root.render(
  <Canvas
    shadows={false}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    // onCreated={ created }
  >
    <Experience />
  </Canvas>
);
