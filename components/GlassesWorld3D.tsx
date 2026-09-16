"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Float, PresentationControls, Sparkles, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/glasses.glb");
  const clone = useMemo(() => scene.clone(true), [scene]);
  const root = useRef<THREE.Group>(null);

  useMemo(() => {
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material = child.material.clone();
        child.material.roughness = Math.min(child.material.roughness ?? 0.5, 0.5);
        child.material.metalness = Math.max(child.material.metalness ?? 0.1, 0.12);
      }
    });
  }, [clone]);

  useFrame(({ clock }) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(clock.elapsedTime * 0.42) * 0.055;
    root.current.rotation.z = Math.sin(clock.elapsedTime * 0.31) * 0.018;
  });

  return <group ref={root} scale={0.014}><primitive object={clone} /></group>;
}

function OrbitRig() {
  const rig = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (rig.current) {
      rig.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.22;
      rig.current.rotation.x += ((pointer.y * -0.12) - rig.current.rotation.x) * 0.04;
    }
    if (inner.current) inner.current.rotation.z = -clock.elapsedTime * 0.24;
  });
  return (
    <group ref={rig} rotation={[0.32, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.012, 10, 110]} />
        <meshBasicMaterial color="#6c58df" transparent opacity={0.62} />
      </mesh>
      <group ref={inner} rotation={[0.9, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[2.48, 0.008, 8, 110]} />
          <meshBasicMaterial color="#72c9a0" transparent opacity={0.38} />
        </mesh>
      </group>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.05, 0, Math.sin(a) * 2.05]}>
            <sphereGeometry args={[i % 2 ? 0.045 : 0.07, 18, 18]} />
            <meshStandardMaterial color={i % 2 ? "#ffd166" : "#ff8fa3"} emissive={i % 2 ? "#ffd166" : "#ff8fa3"} emissiveIntensity={1.5} />
          </mesh>
        );
      })}
    </group>
  );
}

function Lights() {
  const key = useRef<THREE.SpotLight>(null);
  useFrame(({ pointer }) => {
    if (!key.current) return;
    key.current.position.x += (pointer.x * 4.2 + 3.1 - key.current.position.x) * 0.05;
    key.current.position.y += (pointer.y * 2.4 + 4.5 - key.current.position.y) * 0.05;
  });
  return (
    <>
      <ambientLight intensity={1.5} />
      <spotLight ref={key} position={[3, 5, 4]} intensity={46} angle={0.42} penumbra={0.8} color="#fff3d2" castShadow />
      <pointLight position={[-4, 1.5, 3]} intensity={22} color="#7f6cff" />
      <pointLight position={[4, -1, 0]} intensity={16} color="#67d5b1" />
    </>
  );
}

function Scene() {
  return (
    <>
      <Lights />
      <Sparkles count={42} scale={[5.8, 3.4, 3.8]} size={1.5} speed={0.2} opacity={0.35} color="#ffffff" />
      <OrbitRig />
      <PresentationControls global={false} cursor speed={1.25} polar={[-0.28, 0.3]} azimuth={[-0.72, 0.72]} config={{ mass: 1.4, tension: 155 }} snap={{ mass: 2, tension: 115 }}>
        <Float speed={1.35} rotationIntensity={0.16} floatIntensity={0.32}>
          <Center><Model /></Center>
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, -1.55, 0]} opacity={0.3} scale={7} blur={2.8} far={3.8} color="#1a2a3d" />
    </>
  );
}

export default function GlassesWorld3D() {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.15, 5], fov: 35 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
      <Suspense fallback={null}><Scene /></Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/glasses.glb");
