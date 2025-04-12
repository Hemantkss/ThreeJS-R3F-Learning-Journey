import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

const Fox = () => {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { playAnimation } = useControls("Fox", {
    playAnimation: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[playAnimation];
    action.reset().fadeIn(0.5).play()

    return () => 
    {
        action.fadeOut(0.5)
    }

  }, [ playAnimation ]);

  return (
    <>
      <primitive
        object={fox.scene}
        scale={0.02}
        position={[-2.5, 0, 2.5]}
        rotate={0.3}
      />
    </>
  );
};

useGLTF.preload("./Fox/glTF/Fox.gltf");
export default Fox;
