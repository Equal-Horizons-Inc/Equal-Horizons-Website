"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, OrbitControls, Sparkles, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Model({ interacting }: { interacting: boolean }) {
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
        child.material.roughness = Math.min(child.material.roughness ?? 0.5, 0.46);
        child.material.metalness = Math.max(child.material.metalness ?? 0.1, 0.16);
        child.material.envMapIntensity = 1.05;
      }
    });
  }, [clone]);

  useFrame(({ clock }) => {
    if (!root.current || interacting) return;
    root.current.position.y = Math.sin(clock.elapsedTime * 0.72) * 0.035;
  });

  return (
    <group ref={root} scale={0.014}>
      <primitive object={clone} />
    </group>
  );
}

function OrbitRig() {
  const rig = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (rig.current) rig.current.rotation.y = clock.elapsedTime * 0.085;
    if (inner.current) inner.current.rotation.z = -clock.elapsedTime * 0.12;
  });
  return (
    <group ref={rig} rotation={[0.32, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.009, 10, 110]} />
        <meshBasicMaterial color="#6c58df" transparent opacity={0.34} />
      </mesh>
      <group ref={inner} rotation={[0.9, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[2.48, 0.006, 8, 110]} />
          <meshBasicMaterial color="#72c9a0" transparent opacity={0.23} />
        </mesh>
      </group>
    </group>
  );
}

function Lights() {
  const key = useRef<THREE.SpotLight>(null);
  useFrame(({ pointer }) => {
    if (!key.current) return;
    key.current.position.x += (pointer.x * 3.4 + 3.1 - key.current.position.x) * 0.045;
    key.current.position.y += (pointer.y * 2 + 4.3 - key.current.position.y) * 0.045;
  });
  return (
    <>
      <ambientLight intensity={1.6} />
      <spotLight ref={key} position={[3, 5, 4]} intensity={42} angle={0.46} penumbra={0.82} color="#fff3d2" castShadow />
      <pointLight position={[-4, 1.5, 3]} intensity={17} color="#7f6cff" />
      <pointLight position={[4, -1, 0]} intensity={12} color="#67d5b1" />
    </>
  );
}

function Scene() {
  const [interacting, setInteracting] = useState(false);
  return (
    <>
      <Lights />
      <Sparkles count={28} scale={[5.8, 3.4, 3.8]} size={1.2} speed={0.16} opacity={0.24} color="#ffffff" />
      <OrbitRig />
      <Bounds fit clip observe margin={1.18}>
        <Center>
          <Model interacting={interacting} />
        </Center>
      </Bounds>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.065}
        enablePan={false}
        enableZoom
        zoomSpeed={0.72}
        rotateSpeed={0.62}
        minDistance={2.45}
        maxDistance={8.2}
        minPolarAngle={0.48}
        maxPolarAngle={2.58}
        autoRotate={!interacting}
        autoRotateSpeed={0.48}
        onStart={() => setInteracting(true)}
      />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.22} scale={7} blur={3} far={4} color="#1a2a3d" />
    </>
  );
}

export default function GlassesWorld3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.65]}
      camera={{ position: [0, 0.08, 5.2], fov: 34, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.18 }}
      style={{ cursor: "grab", touchAction: "none" }}
      onPointerDown={(event) => { event.currentTarget.style.cursor = "grabbing"; }}
      onPointerUp={(event) => { event.currentTarget.style.cursor = "grab"; }}
      onPointerLeave={(event) => { event.currentTarget.style.cursor = "grab"; }}
    >
      <Suspense fallback={null}><Scene /></Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/glasses.glb");
