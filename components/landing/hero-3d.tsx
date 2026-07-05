"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Crystal() {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 0);
    g.scale(0.85, 1.15, 0.85);
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.45;
      ref.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[0.3, 0, 0.15]} castShadow>
      <meshPhysicalMaterial
        color="#f5f3ff"
        metalness={0.1}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.08}
        reflectivity={0.7}
        flatShading
      />
    </mesh>
  );
}

export function Hero3D({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0.3, 4], fov: 38 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 4]} intensity={1.1} />
        <pointLight position={[-2.5, 1, 2]} intensity={12} color="#7c3aed" distance={8} decay={2} />
        <pointLight position={[2.5, -1, 2]} intensity={12} color="#ec4899" distance={8} decay={2} />
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={1.1}>
          <Crystal />
        </Float>
      </Canvas>
    </div>
  );
}
