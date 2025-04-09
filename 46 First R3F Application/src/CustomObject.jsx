import React from "react";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const CustomObject = () => {
  const geometryRef = useRef();

  const verticesCount = 10 * 3;

  // useMemo is a React hook that helps to optimize performance by memoizing the result of a function call
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  // useEffect is a React hook that allows you to perform side effects in function components
  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>

      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default CustomObject;
