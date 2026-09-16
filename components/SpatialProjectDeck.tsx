"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Radio, Blocks, ScanEye } from "lucide-react";
import Link from "next/link";
import { PointerEvent, ReactNode } from "react";

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 20 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div className={`spatial-card ${className}`} onPointerMove={onMove} onPointerLeave={() => { x.set(0); y.set(0); }} style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry }}>
      {children}
    </motion.div>
  );
}

const cards = [
  { n: "01", title: "Communication signals", copy: "Interfaces that bridge text, sound, gesture, and visual communication without forcing one rigid workflow.", Icon: Radio, style: "signal" },
  { n: "02", title: "Affordable hardware", copy: "Modular parts and repairable assemblies aimed at lowering cost without lowering care.", Icon: Blocks, style: "hardware" },
  { n: "03", title: "Open building blocks", copy: "Experiments that can become reusable pieces instead of disappearing inside a closed prototype.", Icon: ScanEye, style: "open" },
] as const;

export default function SpatialProjectDeck() {
  return (
    <section className="spatial-projects">
      <div className="container-ph">
        <div className="spatial-projects-head">
          <div><p className="editorial-index">04 / AREAS IN MOTION</p><h2 className="display-heading">Depth where it helps. <span>Clarity everywhere else.</span></h2></div>
          <p>Each direction gets its own visual language, but the interaction stays purposeful: reveal relationships, not decoration.</p>
        </div>
        <div className="spatial-deck">
          {cards.map(({ n, title, copy, Icon, style }, i) => (
            <TiltCard key={n} className={`spatial-card--${style}`}>
              <div className="spatial-card-depth spatial-card-depth--back" />
              <div className="spatial-card-depth spatial-card-depth--mid" />
              <div className="spatial-card-top"><span>{n}</span><Icon size={22} /></div>
              <div className={`spatial-visual spatial-visual--${style}`} aria-hidden="true">
                <i className="spatial-core" />
                <i className="spatial-ring spatial-ring--1" />
                <i className="spatial-ring spatial-ring--2" />
                <i className="spatial-ring spatial-ring--3" />
              </div>
              <div className="spatial-card-copy"><h3>{title}</h3><p>{copy}</p><Link href="/vision">Explore direction <ArrowUpRight size={17} /></Link></div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
