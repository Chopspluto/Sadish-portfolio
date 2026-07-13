import { Canvas } from "@react-three/fiber";
import Scenes from "./Components/Scenes";

export default function ThreeCanvas() {
  return (
    <div className="canvas-container">
      <Canvas style={{ pointerEvents: "none" }}>
        <Scenes/>
      </Canvas>
    </div>
  );
}