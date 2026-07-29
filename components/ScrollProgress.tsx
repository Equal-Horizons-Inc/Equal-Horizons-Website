"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.35,
  });

  return (
    <div className="page-progress" aria-hidden="true">
      <motion.span style={{ scaleX }} />
    </div>
  );
}
