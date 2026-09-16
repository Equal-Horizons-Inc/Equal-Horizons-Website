"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, MotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1.,0.)), f.x), mix(hash21(i + vec2(0.,1.)), hash21(i + 1.), f.x), f.y);
  }
  float fbm(vec2 p) {
    float n = 0.;
    for (int i=0; i<4; i++) {
      n += noise(p) / pow(2., float(i));
      p = p * 2.03 + 8.3;
    }
    return n;
  }
  vec3 stars(vec2 uv) {
    vec2 grid = uv * vec2(220., 128.);
    vec2 cell = floor(grid), f = fract(grid) - .5;
    float seed = hash21(cell);
    vec2 p = f - (vec2(hash21(cell + 4.1), hash21(cell + 7.8)) - .5) * .55;
    float radius = mix(.016, .072, pow(seed, 13.));
    float core = 1. - smoothstep(radius, radius * 1.65, length(p));
    float glow = 1. - smoothstep(radius * 1.25, radius * 3.3, length(p));
    float twinkle = .9 + .1 * sin(uTime * (1.1 + seed * 1.7) + seed * 24.);
    float temperature = hash21(cell + 18.7);
    vec3 color = temperature > .89 ? vec3(1.0, .73, .52) : temperature < .12 ? vec3(.58, .73, 1.0) : vec3(.84, .90, 1.0);
    return step(.982, seed) * (core + glow * .11) * twinkle * color;
  }
  void main() {
    float horizon = .445;
    float skyMask = smoothstep(horizon - .018, horizon + .012, vUv.y);
    float dawn = smoothstep(.06, .96, uProgress);

    vec3 horizonNight = vec3(.20,.22,.32);
    vec3 horizonDawn = vec3(.96,.61,.54);
    vec3 zenithNight = vec3(.014,.027,.076);
    vec3 zenithDawn = vec3(.43,.64,.83);
    vec3 horizonColor = mix(horizonNight, horizonDawn, dawn);
    vec3 zenith = mix(zenithNight, zenithDawn, dawn);
    vec3 sky = mix(horizonColor, zenith, smoothstep(horizon, 1., vUv.y));

    float cloud = smoothstep(.58, .80, fbm(vUv * vec2(2.2, 8.) + vec2(uTime * .004, 0.)));
    sky = mix(sky, mix(vec3(.025,.04,.065), vec3(.85,.78,.80), dawn), cloud * smoothstep(.49,.82,vUv.y) * mix(.18,.32,dawn));
    sky += (stars(vUv) + stars(vUv * 1.73 + 13.2) * .35) * (1.0 - dawn);

    float haze = exp(-abs(vUv.y - horizon) * 31.);
    sky += mix(vec3(.44,.25,.18), vec3(1.0,.62,.46), dawn) * haze * mix(.20,.44,dawn);

    // The actual sun disk is rendered as real circular geometry in the 3D scene.
    // Keeping it out of UV space prevents any viewport/aspect-ratio distortion.

    vec3 oceanDeep = mix(vec3(.004,.014,.040), vec3(.035,.12,.23), dawn);
    vec3 oceanShallow = mix(vec3(.025,.082,.13), vec3(.15,.34,.52), dawn);
    vec3 ocean = mix(oceanDeep, oceanShallow, smoothstep(0., horizon, vUv.y));
    vec3 col = mix(ocean, sky, skyMask);
    col += (hash21(vUv * 1800. + uTime) - .5) / 255.;
    gl_FragColor = vec4(col, 1.);
  }
`;

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
    vec4 world = modelMatrix * vec4(p, 1.);
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
    float fresnel = pow(1. - max(dot(normal, viewDir), 0.), 4.0);
    vec3 sunDir = normalize(vec3(mix(-.5,.55,uProgress), .85, -.35));
    vec3 halfDir = normalize(viewDir + sunDir);
    float specular = pow(max(dot(normal, halfDir), 0.), 135.) * smoothstep(.16,.9,uProgress);
    float ripple = sin(vWorldPosition.z * 15. - uTime * 1.3) * .012;
    vec3 deep = mix(vec3(.003,.018,.052), vec3(.032,.12,.23), uProgress);
    vec3 face = mix(vec3(.022,.12,.18), vec3(.14,.34,.52), uProgress) + ripple;
    float facetLight = dot(normal, normalize(vec3(-.35,.82,.38))) * .5 + .5;
    vec3 color = mix(deep, face, fresnel * .66 + .16) * mix(.78, 1.15, facetLight);
    color += vec3(1.0,.73,.48) * specular * .15;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Sky({ progress }: { progress: MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
  }), []);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uProgress.value = progress.current;
  });
  return (
    <mesh scale={[34, 20, 1]} position={[0, 0, -5.8]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={material} vertexShader={vertex} fragmentShader={skyFragment} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

function SunDisk({ progress }: { progress: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const disk = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!group.current) return;
    const p = THREE.MathUtils.smoothstep(progress.current, 0.10, 0.96);
    const visible = THREE.MathUtils.smoothstep(progress.current, 0.08, 0.24);

    // Real CircleGeometry stays circular under perspective projection at every viewport size.
    group.current.position.x = THREE.MathUtils.lerp(-1.95, 1.35, p);
    group.current.position.y = THREE.MathUtils.lerp(-0.72, 2.05, p);
    group.current.position.z = -5.62;
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.84, 1.0, p));
    // Billboard the disk toward the active camera. A flat circle viewed at an angle
    // projects as an ellipse, so matching the camera quaternion guarantees a circle.
    group.current.quaternion.copy(camera.quaternion);

    if (disk.current) {
      disk.current.opacity = visible;
      disk.current.color.setRGB(
        THREE.MathUtils.lerp(1.0, 1.0, p),
        THREE.MathUtils.lerp(0.54, 0.82, p),
        THREE.MathUtils.lerp(0.30, 0.55, p),
      );
    }
    if (glow.current) glow.current.opacity = visible * 0.16;
  });

  return (
    <group ref={group}>
      <mesh>
        <circleGeometry args={[0.68, 96]} />
        <meshBasicMaterial ref={disk} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.01]} scale={1.55}>
        <circleGeometry args={[0.68, 96]} />
        <meshBasicMaterial
          ref={glow}
          color="#ffd59d"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Water({ progress }: { progress: MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { camera, pointer, size } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uCamera: { value: new THREE.Vector3() }, uProgress: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
      material.current.uniforms.uCamera.value.copy(camera.position);
      material.current.uniforms.uProgress.value = progress.current;
    }
    if (group.current) {
      group.current.rotation.z += ((pointer.x * 0.012) - group.current.rotation.z) * 0.028;
      group.current.rotation.x += ((-0.035 - pointer.y * 0.006) - group.current.rotation.x) * 0.028;
    }

    // Keep the horizon in a stable visual band across laptop/tablet/mobile aspect ratios.
    const aspect = size.width / Math.max(size.height, 1);
    const compact = aspect < 1.05;
    const targetX = pointer.x * (compact ? 0.10 : 0.26) + progress.current * (compact ? 0.06 : 0.18);
    const targetY = (compact ? 1.08 : 1.20) + pointer.y * 0.05 + progress.current * 0.10;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.position.z += ((compact ? 9.6 : 8.6) - camera.position.z) * 0.025;
    camera.lookAt(0, compact ? -0.42 : -0.34, -4.8);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, -4.7]}>
        <planeGeometry args={[46, 42, 150, 110]} />
        <shaderMaterial ref={material} vertexShader={waterVertex} fragmentShader={waterFragment} uniforms={uniforms} />
      </mesh>
    </group>
  );
}

function DawnLight({ progress }: { progress: MutableRefObject<number> }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    if (!light.current) return;
    const p = progress.current;
    light.current.intensity = THREE.MathUtils.lerp(0.05, 1.15, p);
    light.current.position.x = THREE.MathUtils.lerp(-4, 3.5, p);
  });
  return <directionalLight ref={light} position={[-4, 5, 2]} color="#ffd0a0" intensity={0.05} />;
}

function Scene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <>
      <Sky progress={progress} />
      <SunDisk progress={progress} />
      <DawnLight progress={progress} />
      <Water progress={progress} />
    </>
  );
}

const steps = [
  ["01", "Listen before building.", "Start with a real barrier in someone’s day—not a feature list."],
  ["02", "Make the idea tangible.", "Prototype quickly enough to learn and carefully enough that feedback can change the direction."],
  ["03", "Open the path wider.", "Aim for tools that are understandable, adaptable, and easier for more people to reach."],
] as const;

function HorizonStep({ progress, index, n, title, copy }: { progress: MotionValue<number>; index: number; n: string; title: string; copy: string }) {
  const allRanges: [number, number, number, number][] = [
    [0.00, 0.08, 0.26, 0.39],
    [0.29, 0.39, 0.57, 0.70],
    [0.61, 0.71, 0.90, 1.00],
  ];
  const ranges = allRanges[Math.max(0, Math.min(allRanges.length - 1, index))];
  const opacity = useTransform(progress, ranges, [0, 1, 1, 0]);
  const y = useTransform(progress, ranges, [28, 0, 0, -24]);
  const scale = useTransform(progress, ranges, [0.985, 1, 1, 0.992]);

  return (
    <motion.article className="horizon-3d-step" style={{ opacity, y, scale }} aria-hidden={false}>
      <span>{n}</span>
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
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = reduceMotion ? 0.72 : value;
  });

  return (
    <section ref={root} className="horizon-3d-section">
      <div className="horizon-3d-sticky">
        <div className="horizon-3d-canvas" aria-hidden="true">
          <Canvas
            dpr={[1, 1.65]}
            camera={{ position: [0, 1.2, 8.6], fov: 46, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.92 }}
          >
            <Scene progress={progressRef} />
          </Canvas>
        </div>
        <div className="horizon-3d-vignette" />
        <div className="container-ph horizon-3d-copy">
          <p className="horizon-3d-kicker">02 / MOVE TOWARD THE HORIZON</p>
          <div className="horizon-3d-steps">
            {steps.map(([n, title, copy], index) => (
              <HorizonStep key={n} progress={scrollYProgress} index={index} n={n} title={title} copy={copy} />
            ))}
          </div>
        </div>
        <div className="horizon-3d-meter" aria-hidden="true">
          <span>NIGHT</span>
          <div className="horizon-3d-meter-track"><motion.i style={{ scaleX: scrollYProgress }} /></div>
          <span>DAWN</span>
        </div>
      </div>
    </section>
  );
}
