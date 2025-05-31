import React from "react";
import useFPS from "./useFPS";

function FPSIndex() {
  const fps = useFPS();
  return (
    <div>
      <h1>FPS</h1>
      <h2>{fps}</h2>
    </div>
  );
}

export default FPSIndex;
