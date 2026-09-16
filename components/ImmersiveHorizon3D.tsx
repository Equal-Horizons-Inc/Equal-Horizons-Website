"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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
    float skyMask = smoothstep(horizon - .025, horizon + .018, vUv.y);
    vec3 horizonColor = mix(vec3(.27,.31,.42), vec3(.96,.68,.73), uProgress);
    vec3 zenith = mix(vec3(.018,.036,.095), vec3(.46,.66,.82), uProgress);
    vec3 sky = mix(horizonColor, zenith, smoothstep(horizon, 1., vUv.y));
    float cloud = smoothstep(.56, .78, fbm(vUv * vec2(2.2, 8.) + vec2(uTime * .004, 0.)));
    sky = mix(sky, mix(vec3(.025,.04,.065), vec3(.82,.77,.84), uProgress), cloud * smoothstep(.47,.78,vUv.y) * mix(.24,.38,uProgress));
    sky += (stars(vUv) + stars(vUv * 1.73 + 13.2) * .35) * (1.0 - uProgress);
    float haze = exp(-abs(vUv.y - horizon) * 31.);
    sky += mix(vec3(.56,.32,.20), vec3(1.0,.702,.776), uProgress) * haze * mix(.38,.55,uProgress);
    vec3 oceanDeep = mix(vec3(.004,.014,.040), vec3(.035,.13,.25), uProgress);
    vec3 oceanShallow = mix(vec3(.035,.105,.155), vec3(.18,.40,.60), uProgress);
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
    return wave(p, normalize(vec2(.8,.35)), .34, 1.15, .34)
      + wave(p, normalize(vec2(-.25,.97)), .63, .82, .16)
      + wave(p, normalize(vec2(.96,-.18)), 1.15, 1.7, .075)
      + wave(p, normalize(vec2(-.62,.78)), 2.4, 2.2, .025);
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
    float fresnel = pow(1. - max(dot(normal, viewDir), 0.), 4.2);
    vec3 moonDir = normalize(vec3(3.5, 6., -8.));
    vec3 halfDir = normalize(viewDir + moonDir);
    float specular = pow(max(dot(normal, halfDir), 0.), 180.) * 1.35;
    float ripple = sin(vWorldPosition.z * 17. - uTime * 1.4) * .015;
    vec3 deep = mix(vec3(.003,.018,.052), vec3(.035,.13,.25), uProgress);
    vec3 face = mix(vec3(.025,.15,.205), vec3(.18,.40,.60), uProgress) + ripple;
    float facetLight = dot(normal, normalize(vec3(-.35,.82,.38))) * .5 + .5;
    vec3 color = mix(deep, face, fresnel * .72 + .18) * mix(.72, 1.2, facetLight);
    color += mix(vec3(.56,.68,.92), vec3(1.0,.85,.75), uProgress) * specular * .1;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Sky({ progress }: { progress: React.MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uProgress: { value: 0 } }), []);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uProgress.value = progress.current;
  });
  return (
    <mesh scale={[22, 14, 1]} position={[0, 0, -3]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={material} vertexShader={vertex} fragmentShader={skyFragment} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

function Water({ progress }: { progress: React.MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uCamera: { value: new THREE.Vector3() }, uProgress: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
      material.current.uniforms.uCamera.value.copy(camera.position);
      material.current.uniforms.uProgress.value = progress.current;
    }
    if (group.current) {
      group.current.rotation.z += ((pointer.x * 0.022) - group.current.rotation.z) * 0.035;
      group.current.rotation.x += ((-0.04 - pointer.y * 0.012) - group.current.rotation.x) * 0.035;
    }
    const targetX = pointer.x * 0.4 + progress.current * 0.32;
    const targetY = 1.25 + pointer.y * 0.12 + progress.current * 0.18;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.lookAt(0, -0.25, -4);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, -4]}>
        <planeGeometry args={[38, 34, 150, 110]} />
        <shaderMaterial ref={material} vertexShader={waterVertex} fragmentShader={waterFragment} uniforms={uniforms} />
      </mesh>
    </group>
  );
}

function RisingSun({ progress }: { progress: React.MutableRefObject<number> }) {
  const sun = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(() => {
    const p = progress.current;
    const x = THREE.MathUtils.lerp(-3.1, 1.2, p);
    const y = THREE.MathUtils.lerp(-0.9, 2.15, p);
    if (sun.current) {
      sun.current.position.set(x, y, -5.8);
      sun.current.scale.setScalar(THREE.MathUtils.lerp(0.45, 0.82, p));
      (sun.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.smoothstep(p, 0.1, 0.38);
    }
    if (light.current) {
      light.current.position.set(x, y, -3.4);
      light.current.intensity = THREE.MathUtils.lerp(0.2, 4.2, p);
    }
  });
  return (
    <>
      <mesh ref={sun}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshBasicMaterial color="#ffd79b" transparent opacity={0} />
      </mesh>
      <pointLight ref={light} color="#ffc77e" distance={18} decay={2} />
    </>
  );
}

function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  return (
    <>
      <Sky progress={progress} />
      <RisingSun progress={progress} />
      <Water progress={progress} />
    </>
  );
}

const steps = [
  ["01", "Listen before building.", "Start with a real barrier in someone’s day—not a feature list."],
  ["02", "Make the idea tangible.", "Prototype quickly enough to learn and carefully enough that feedback can change the direction."],
  ["03", "Open the path wider.", "Aim for tools that are understandable, adaptable, and easier for more people to reach."],
] as const;

export default function ImmersiveHorizon3D() {
  const root = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const progress = reduceMotion ? 0.72 : value;
    progressRef.current = progress;
    setActiveStep(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
  });

  return (
    <section ref={root} className="horizon-3d-section">
      <div className="horizon-3d-sticky">
        <div className="horizon-3d-canvas" aria-hidden="true">
          <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.25, 8.5], fov: 46 }} gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.86 }}>
            <Scene progress={progressRef} />
          </Canvas>
        </div>
        <div className="horizon-3d-vignette" />
        <div className="container-ph horizon-3d-copy">
          <p className="horizon-3d-kicker">02 / MOVE TOWARD THE HORIZON</p>
          <div className="horizon-3d-steps">
            {steps.map(([n, title, copy], index) => (
              <motion.article
                key={n}
                className="horizon-3d-step"
                initial={false}
                animate={{ opacity: index === activeStep ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <span>{n}</span><h2>{title}</h2><p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="horizon-3d-meter"><span>NIGHT</span><i /><span>DAWN</span></div>
      </div>
    </section>
  );
}
