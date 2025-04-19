import { EffectComposer, DepthOfField, } from "@react-three/postprocessing";

export default function Effect() {
  return (
    <>
      <EffectComposer>
        <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={3} />
      </EffectComposer>
    </>
  );
}
