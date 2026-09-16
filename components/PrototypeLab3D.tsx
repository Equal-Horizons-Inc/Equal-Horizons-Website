"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { MagnifyingGlassPlus, MouseSimple } from "@phosphor-icons/react";
import { useRef } from "react";
import GlassesWorld3D from "./GlassesWorld3D";

export default function PrototypeLab3D() {
  const root = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 85%", "end 20%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.55 });
  const stageY = useTransform(p, [0, 0.5, 1], [70, 0, -24]);
  const stageScale = useTransform(p, [0, 0.48, 1], [0.9, 1, 0.975]);
  const stageRotateX = useTransform(p, [0, 0.45, 1], [5, 0, -1.5]);
  const stageRotateY = useTransform(p, [0, 0.6, 1], [-4, 0, 2]);
  const copyY = useTransform(p, [0, 0.35], [38, 0]);
  const copyOpacity = useTransform(p, [0, 0.28], [0.15, 1]);

  return (
    <section ref={root} className="prototype-3d-section">
      <div className="container-ph prototype-3d-grid">
        <motion.div className="prototype-3d-copy" style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}>
          <p className="editorial-index">03 / PROTOTYPE LAB</p>
          <h2 className="display-heading">Don’t just look at the idea. <span>Inspect it.</span></h2>
          <p className="prototype-3d-lede">This is the actual smart-glasses model from the prototype work. Drag to orbit, right-drag to pan, and scroll or pinch to zoom so you can inspect the form from the angle you want.</p>
          <div className="prototype-3d-facts">
            <div><span>01</span><p>Wearable form first</p></div>
            <div><span>02</span><p>Space for visual cues</p></div>
            <div><span>03</span><p>Designed to be questioned</p></div>
          </div>
        </motion.div>

        <motion.div
          className="prototype-3d-stage"
          style={reduceMotion ? undefined : { y: stageY, scale: stageScale, rotateX: stageRotateX, rotateY: stageRotateY }}
        >
          <div className="prototype-3d-corner prototype-3d-corner--a" />
          <div className="prototype-3d-corner prototype-3d-corner--b" />
          <div className="prototype-3d-canvas" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch><GlassesWorld3D /></div>
          <div className="prototype-3d-tag prototype-3d-tag--a"><span>LIVE MODEL</span> GLB / WEBGL</div>
          <div className="prototype-3d-tag prototype-3d-tag--b"><span>VIEWER</span> ORBIT / ZOOM</div>
          <div className="prototype-3d-drag">
            <span><MouseSimple size={16} weight="bold" /> Drag to orbit</span>
            <i />
            <span><MagnifyingGlassPlus size={16} weight="bold" /> Scroll to zoom</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
