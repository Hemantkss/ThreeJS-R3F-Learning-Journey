import React from "react";
import DrunkEffect from "./DrunkEffect";
import { forwardRef } from "react";

export default forwardRef(function Drunk(props, ref) {
  const effect = new DrunkEffect(props);

  return <primitive ref={ref} object={effect} />;
});
