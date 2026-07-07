"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Shared, normalized pointer (-1..1) driven by a window listener so parallax
   works even though the canvas itself is pointer-events:none (so it never
   blocks the hero buttons behind it). */
const pointer = { x: 0, y: 0 };

/* Central faceted crystal — the hero focal object. */
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

/* A small orbiting shape — sphere or octahedron — for depth. */
function Orbiter({
  radius,
  speed,
  offset,
  y,
  size,
  color,
  kind,
}: {
  radius: number;
  speed: number;
  offset: number;
  y: number;
  size: number;
  color: string;
  kind: "sphere" | "octa";
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 1.3) * 0.25, Math.sin(t) * radius);
    ref.current.rotation.y += 0.02;
    ref.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={ref}>
      {kind === "sphere" ? (
        <sphereGeometry args={[size, 24, 24]} />
      ) : (
        <octahedronGeometry args={[size, 0]} />
      )}
      <meshPhysicalMaterial
        color={color}
        metalness={0.2}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={color}
        emissiveIntensity={0.15}
        flatShading={kind === "octa"}
      />
    </mesh>
  );
}

/* Group that gently tilts toward the mouse for a parallax feel. */
function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    // Ease the group rotation toward the pointer position.
    group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-pointer.y * 0.3 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={1.1}>
        <Crystal />
      </Float>
      <Orbiter radius={1.9} speed={0.5} offset={0} y={0.4} size={0.18} color="#a78bfa" kind="sphere" />
      <Orbiter radius={2.1} speed={0.4} offset={2.1} y={-0.5} size={0.22} color="#f472b6" kind="octa" />
      <Orbiter radius={1.7} speed={0.6} offset={4.2} y={0.7} size={0.14} color="#818cf8" kind="sphere" />
    </group>
  );
}

export function Hero3D({ className = "" }: { className?: string }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    function onMove(e: MouseEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0.3, 4.5], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 4]} intensity={1.1} />
        <pointLight position={[-2.5, 1, 2]} intensity={14} color="#7c3aed" distance={9} decay={2} />
        <pointLight position={[2.5, -1, 2]} intensity={14} color="#ec4899" distance={9} decay={2} />
        <Scene />
      </Canvas>
    </div>
  );
}
