"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * An abstract "horizon" composition: layered rising bands in the brand
 * palette with a soft arc breaking over the line, and a scatter of
 * small paths converging toward it. Meant to read as "many different
 * starting points, one accessible way forward" without any literal
 * iconography (no figures, no devices, no stock imagery).
 */
export default function HorizonVisual() {
  const shouldReduceMotion = useReducedMotion();

  const arcAnim = shouldReduceMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  const bandAnim = (delay: number, distance: number) =>
    shouldReduceMotion
      ? {}
      : {
          animate: { x: [0, distance, 0] },
          transition: {
            duration: 18 + delay * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg select-none">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Abstract illustration of layered horizon lines rising toward a soft arc of light, symbolizing many paths converging toward accessibility."
      >
        <defs>
          <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#95CCDD" />
            <stop offset="100%" stopColor="#4274D9" />
          </linearGradient>
          <linearGradient id="bandGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4274D9" />
            <stop offset="100%" stopColor="#293681" />
          </linearGradient>
          <linearGradient id="bandGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#95CCDD" />
            <stop offset="100%" stopColor="#4274D9" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D0E7E6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D0E7E6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ambient glow behind the arc */}
        <circle cx="250" cy="230" r="190" fill="url(#glow)" />

        {/* rising arc — "independence" breaking the horizon line */}
        <motion.path
          {...arcAnim}
          d="M 90 300 A 160 160 0 0 1 410 300"
          stroke="url(#arcGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* small paths converging toward the arc — many starting points, one way forward */}
        {[
          { x1: 40, y1: 430, x2: 170, y2: 300 },
          { x1: 120, y1: 460, x2: 210, y2: 320 },
          { x1: 460, y1: 430, x2: 330, y2: 300 },
          { x1: 380, y1: 460, x2: 290, y2: 320 },
        ].map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#95CCDD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 10"
            opacity={0.7}
          />
        ))}

        {/* horizon bands */}
        <motion.path
          {...bandAnim(0, 14)}
          d="M -20 340 C 90 300, 160 380, 260 340 C 360 300, 420 360, 520 330 L 520 520 L -20 520 Z"
          fill="url(#bandGradient2)"
          opacity="0.35"
        />
        <motion.path
          {...bandAnim(0.6, -18)}
          d="M -20 380 C 100 420, 180 350, 280 390 C 380 430, 440 370, 520 400 L 520 520 L -20 520 Z"
          fill="url(#bandGradient1)"
          opacity="0.55"
        />
        <motion.path
          {...bandAnim(1.1, 10)}
          d="M -20 430 C 110 400, 200 460, 300 425 C 390 395, 450 445, 520 420 L 520 520 L -20 520 Z"
          fill="#293681"
        />

        {/* small orbiting points of light */}
        <motion.circle
          cx="150"
          cy="180"
          r="5"
          fill="#D0E7E6"
          animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="350"
          cy="150"
          r="4"
          fill="#95CCDD"
          animate={shouldReduceMotion ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.circle
          cx="250"
          cy="110"
          r="3.5"
          fill="#4274D9"
          animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>
    </div>
  );
}
