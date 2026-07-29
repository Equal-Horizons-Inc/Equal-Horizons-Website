"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent } from "react";

export default function AnimeHorizonScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 110,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 110,
    damping: 22,
  });
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 18%", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const sceneY = useTransform(smoothScroll, [0, 1], [0, 110]);
  const sceneScale = useTransform(smoothScroll, [0, 1], [1, 0.9]);
  const sceneRotate = useTransform(smoothScroll, [0, 1], [0, 2.2]);
  const sceneOpacity = useTransform(smoothScroll, [0.72, 1], [1, 0.55]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={rootRef}
      className="anime-horizon-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="anime-horizon-stage"
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                rotateZ: sceneRotate,
                y: sceneY,
                scale: sceneScale,
                opacity: sceneOpacity,
              }
        }
      >
        <Image
          src="/horizon-scene.svg"
          alt="A bright cel-shaded horizon garden with rolling hills, a sunrise portal, flowers, clouds, and orbiting idea seeds."
          width={920}
          height={760}
          priority
          unoptimized
          className="anime-horizon-svg"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
