import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Thomann(props) {
  const { nodes, materials } = useGLTF("./thomann.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.002"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0.5, 0.15, -0.94]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-0.49, 0.27, -0.95]}
        scale={0.18}
      />
    </group>
  );
}

useGLTF.preload("./thomann.glb");
