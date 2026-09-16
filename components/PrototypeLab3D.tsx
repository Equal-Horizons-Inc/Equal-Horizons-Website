"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Rotate3D } from "lucide-react";
import { useRef } from "react";
import GlassesWorld3D from "./GlassesWorld3D";

export default function PrototypeLab3D() {
  const root = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 85%", "end 20%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.55 });
  const stageY = useTransform(p, [0, 0.5, 1], [90, 0, -32]);
  const stageScale = useTransform(p, [0, 0.48, 1], [0.86, 1, 0.96]);
  const stageRotateX = useTransform(p, [0, 0.45, 1], [8, 0, -3]);
  const stageRotateY = useTransform(p, [0, 0.6, 1], [-7, 0, 4]);
  const copyY = useTransform(p, [0, 0.35], [45, 0]);
  const copyOpacity = useTransform(p, [0, 0.28], [0.15, 1]);

  return (
    <section ref={root} className="prototype-3d-section">
      <div className="container-ph prototype-3d-grid">
        <motion.div className="prototype-3d-copy" style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}>
          <p className="editorial-index">03 / PROTOTYPE LAB</p>
          <h2 className="display-heading">Don’t just look at the idea. <span>Move around it.</span></h2>
          <p className="prototype-3d-lede">This is the actual smart-glasses model from the prototype work—not a flat mockup. Drag it, tilt it, and inspect the form from different angles.</p>
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
          <div className="prototype-3d-gridlines" />
          <div className="prototype-3d-corner prototype-3d-corner--a" />
          <div className="prototype-3d-corner prototype-3d-corner--b" />
          <div className="prototype-3d-canvas"><GlassesWorld3D /></div>
          <div className="prototype-3d-tag prototype-3d-tag--a"><span>LIVE MODEL</span> GLB / WEBGL</div>
          <div className="prototype-3d-tag prototype-3d-tag--b"><span>LIGHTING</span> POINTER REACTIVE</div>
          <div className="prototype-3d-drag"><Rotate3D size={16} /> DRAG TO ROTATE · MOVE POINTER FOR LIGHT</div>
        </motion.div>
      </div>
    </section>
  );
}
