"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;

    // ease the field toward the cursor for a subtle parallax feel
    pointsRef.current.rotation.x +=
      (mouse.current.y * 0.15 - pointsRef.current.rotation.x) * 0.03;
    pointsRef.current.rotation.y +=
      (mouse.current.x * 0.15 - pointsRef.current.rotation.y) * 0.03;
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    mouse.current.x = (e.pointer.x ?? 0);
    mouse.current.y = (e.pointer.y ?? 0);
  };

  return (
    <points ref={pointsRef} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <Particles />
    </Canvas>
  );
}