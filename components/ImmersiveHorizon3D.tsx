"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

const waterVertex = /* glsl */ `
  varying vec3 vWorldPosition;
  uniform float uTime;

  float wave(vec2 p, vec2 dir, float frequency, float speed, float steepness) {
    float phase = dot(p, dir) * frequency + uTime * speed;
    return sin(phase) * steepness;
  }

  float heightAt(vec2 p) {
    return wave(p, normalize(vec2(.8,.35)), .34, 1.15, .27)
      + wave(p, normalize(vec2(-.25,.97)), .63, .82, .12)
      + wave(p, normalize(vec2(.96,-.18)), 1.15, 1.7, .055)
      + wave(p, normalize(vec2(-.62,.78)), 2.4, 2.2, .018);
  }

  void main() {
    vec3 p = position;
    p.z = heightAt(p.xy);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const waterFragment = /* glsl */ `
  varying vec3 vWorldPosition;
  uniform vec3 uCamera;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vec3 normal = normalize(cross(dFdx(vWorldPosition), dFdy(vWorldPosition)));
    normal *= gl_FrontFacing ? 1.0 : -1.0;

    vec3 viewDir = normalize(uCamera - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

    vec3 sunDir = normalize(vec3(mix(-.48,.50,uProgress), .86, -.35));
    vec3 halfDir = normalize(viewDir + sunDir);
    float specular = pow(max(dot(normal, halfDir), 0.0), 118.0) * smoothstep(.18,.92,uProgress);

    float microRipple = sin(vWorldPosition.x * 1.4 + vWorldPosition.y * 1.1 - uTime * .52) * .012;
    vec3 nightDeep = vec3(.002,.012,.034);
    vec3 nightFace = vec3(.015,.074,.115);
    vec3 dawnDeep = vec3(.025,.095,.19);
    vec3 dawnFace = vec3(.12,.31,.47);
    vec3 deep = mix(nightDeep, dawnDeep, uProgress);
    vec3 face = mix(nightFace, dawnFace, uProgress) + microRipple;

    float facetLight = dot(normal, normalize(vec3(-.35,.82,.38))) * .5 + .5;
    vec3 color = mix(deep, face, fresnel * .68 + .14) * mix(.78, 1.16, facetLight);
    color += vec3(1.0,.69,.42) * specular * .17;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Water({ progress }: { progress: MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { camera, pointer, size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCamera: { value: new THREE.Vector3() },
      uProgress: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
      material.current.uniforms.uCamera.value.copy(camera.position);
      material.current.uniforms.uProgress.value = progress.current;
    }

    const aspect = size.width / Math.max(size.height, 1);
    const portrait = aspect < 1.02;
    const shortLaptop = size.height < 720 && aspect > 1.2;

    // Tiny pointer drift keeps the ocean alive without moving the composition out of frame.
    if (group.current) {
      const targetZ = pointer.x * (portrait ? 0.004 : 0.009);
      const targetX = -0.035 - pointer.y * 0.004;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    }

    // Responsive camera framing. The horizon stays in the same visual band instead of
    // being tied to a single 1440x900 artboard.
    const cameraX = pointer.x * (portrait ? 0.06 : 0.15);
    const cameraY = portrait ? 1.06 : shortLaptop ? 1.14 : 1.20;
    const cameraZ = portrait ? 9.9 : shortLaptop ? 9.15 : 8.75;
    const lookY = portrait ? -0.48 : shortLaptop ? -0.40 : -0.35;

    camera.position.x += (cameraX - camera.position.x) * 0.025;
    camera.position.y += (cameraY - camera.position.y) * 0.025;
    camera.position.z += (cameraZ - camera.position.z) * 0.025;
    camera.lookAt(0, lookY, -4.8);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, -4.7]}>
        <planeGeometry args={[48, 44, 156, 116]} />
        <shaderMaterial
          ref={material}
          vertexShader={waterVertex}
          fragmentShader={waterFragment}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

const steps = [
  {
    number: "01",
    label: "Listen",
    title: "Begin with a real day, not a feature list.",
    copy: "Understand routines, frustrations, environments, and goals from the people who would actually use the technology.",
  },
  {
    number: "02",
    label: "Shape",
    title: "Turn what we hear into a small, testable idea.",
    copy: "Narrow the problem and make the smallest useful concept that can start a meaningful conversation.",
  },
  {
    number: "03",
    label: "Build",
    title: "Prototype for comfort, cost, and everyday use.",
    copy: "Judge the idea by affordability, clarity, repairability, and whether it fits naturally into daily life—not novelty alone.",
  },
  {
    number: "04",
    label: "Learn",
    title: "Share what worked, what failed, and what comes next.",
    copy: "Keep early work honest. Feedback and open learning should be able to change the next version.",
  },
] as const;

function HorizonStep({
  progress,
  index,
  number,
  label,
  title,
  copy,
}: {
  progress: MotionValue<number>;
  index: number;
  number: string;
  label: string;
  title: string;
  copy: string;
}) {
  const ranges: [number, number, number, number][] = [
    [0.00, 0.035, 0.19, 0.27],
    [0.23, 0.30, 0.43, 0.52],
    [0.48, 0.55, 0.69, 0.77],
    [0.73, 0.80, 0.965, 1.00],
  ];
  const range = ranges[Math.max(0, Math.min(ranges.length - 1, index))];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [22, 0, 0, -18]);
  const scale = useTransform(progress, range, [0.992, 1, 1, 0.995]);

  return (
    <motion.article className="horizon-3d-step" style={{ opacity, y, scale }}>
      <div className="horizon-step-meta">
        <span>{number}</span>
        <b>{label}</b>
      </div>
      <h2>{title}</h2>
      <p>{copy}</p>
    </motion.article>
  );
}

export default function ImmersiveHorizon3D() {
  const root = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 25, mass: 0.55 });

  useMotionValueEvent(smoothProgress, "change", (value) => {
    progressRef.current = reduceMotion ? 0.66 : value;
  });

  // The sun is deliberately a CSS circle behind the WebGL water. That means its
  // aspect ratio can never be distorted by the 3D camera, and the ocean naturally
  // occludes it while it rises from below the horizon.
  const dawnOpacity = useTransform(smoothProgress, [0.04, 0.72, 1], [0, 0.72, 1]);
  const starsOpacity = useTransform(smoothProgress, [0, 0.45, 0.78], [1, 0.78, 0.08]);
  const sunOpacity = useTransform(smoothProgress, [0.08, 0.18, 0.30], [0, 0.15, 1]);
  const sunTop = useTransform(smoothProgress, [0, 0.15, 0.34, 1], ["68%", "58%", "46%", "18%"]);
  const sunLeft = useTransform(smoothProgress, [0, 1], ["42%", "66%"]);
  const sunScale = useTransform(smoothProgress, [0, 0.35, 1], [0.86, 0.94, 1]);
  const glowOpacity = useTransform(smoothProgress, [0.08, 0.32, 1], [0, 0.32, 0.7]);

  return (
    <section ref={root} className="horizon-3d-section" id="process">
      <div className="horizon-3d-sticky">
        <div className="horizon-sky" aria-hidden="true">
          <div className="horizon-sky-night" />
          <motion.div className="horizon-sky-dawn" style={reduceMotion ? { opacity: 0.76 } : { opacity: dawnOpacity }} />
          <motion.div className="horizon-stars" style={reduceMotion ? { opacity: 0.18 } : { opacity: starsOpacity }} />
          <motion.div
            className="horizon-sun-glow"
            style={reduceMotion ? { opacity: 0.42 } : { opacity: glowOpacity, left: sunLeft, top: sunTop, scale: sunScale }}
          />
          <motion.div
            className="horizon-sun"
            style={reduceMotion ? { opacity: 1 } : { opacity: sunOpacity, left: sunLeft, top: sunTop, scale: sunScale }}
          />
        </div>

        <div className="horizon-3d-canvas" aria-hidden="true">
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 1.2, 8.75], fov: 46, near: 0.1, far: 100 }}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.94,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <Water progress={progressRef} />
          </Canvas>
        </div>

        <div className="horizon-3d-vignette" aria-hidden="true" />

        <div className="container-ph horizon-3d-copy">
          <p className="horizon-3d-kicker">02 / HOW AN IDEA MOVES</p>
          <div className="horizon-3d-steps">
            {steps.map((step, index) => (
              <HorizonStep
                key={step.number}
                progress={smoothProgress}
                index={index}
                number={step.number}
                label={step.label}
                title={step.title}
                copy={step.copy}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
