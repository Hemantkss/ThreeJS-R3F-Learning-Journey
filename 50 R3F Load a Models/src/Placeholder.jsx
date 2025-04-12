import React from "react";

const Placeholder = (props) => {
  return (
    <mesh { ...props } >
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial color="orange" wireframe />
    </mesh>
  );
};

export default Placeholder;
