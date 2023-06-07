import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  SpotLight,
  TrackballControls,
} from "@react-three/drei";
import Thomann from "./Thomann";
import Cloud from "./WordSphere";
import { usePlane } from "@react-three/cannon";
const Contact3D = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Cloud count={8} radius={20} />
      <TrackballControls />
    </Canvas>

    // <Canvas>
    //   <Suspense fallback={null}>
    //     <OrbitControls enableZoom={false}></OrbitControls>
    //     <Thomann />

    //     <ambientLight intensity={0.6} />
    //     <directionalLight color="white" position={[0, 0, 5]} />
    //   </Suspense>
    // </Canvas>
  );
};

export default Contact3D;
