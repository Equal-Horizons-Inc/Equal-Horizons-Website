"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Eye, Lightbulb, Radio } from "lucide-react";
import { useRef } from "react";

export type ProjectScrollRowProps = {
  index: string;
  status: string;
  title: string;
  copy: string;
  art: "glasses" | "signals" | "hardware";
};

const icons = {
  glasses: Eye,
  signals: Radio,
  hardware: Lightbulb,
};

export default function ProjectScrollRow(project: ProjectScrollRowProps) {
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const Icon = icons[project.art];
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 92%", "end 20%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.45,
  });
  const copyY = useTransform(smooth, [0, 0.45], [48, 0]);
  const copyOpacity = useTransform(smooth, [0, 0.35], [0.15, 1]);
  const artX = useTransform(smooth, [0, 0.55], [120, 0]);
  const artRotate = useTransform(smooth, [0, 0.55], [3.5, 0]);
  const artScale = useTransform(smooth, [0, 0.55], [0.93, 1]);

  return (
    <article ref={rowRef} className="project-row">
      <div className="project-number">{project.index}</div>
      <motion.div
        className="project-copy"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <span className="project-status">{project.status}</span>
        <h3>{project.title}</h3>
        <p>{project.copy}</p>
        <Link
          href="/vision"
          className="project-link"
          aria-label={`Learn more about ${project.title}`}
        >
          Explore direction <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </motion.div>

      <motion.div
        className={`project-art project-art--${project.art}`}
        style={
          reduceMotion
            ? undefined
            : { x: artX, rotate: artRotate, scale: artScale }
        }
        aria-hidden="true"
      >
        <div className="project-art-sun" />
        {project.art === "glasses" && (
          <div className="glasses-object">
            <span className="lens lens--left" />
            <span className="lens lens--right" />
            <span className="bridge" />
            <span className="hud-line hud-line--one" />
            <span className="hud-line hud-line--two" />
          </div>
        )}
        {project.art === "signals" && (
          <div className="signal-object">
            <span className="signal-core" />
            <span className="signal-ring signal-ring--one" />
            <span className="signal-ring signal-ring--two" />
            <span className="signal-ring signal-ring--three" />
          </div>
        )}
        {project.art === "hardware" && (
          <div className="hardware-object">
            <span className="chip" />
            <span className="trace trace--one" />
            <span className="trace trace--two" />
            <span className="trace trace--three" />
            <span className="node node--one" />
            <span className="node node--two" />
            <span className="node node--three" />
          </div>
        )}
        <Icon className="project-art-icon" size={24} strokeWidth={1.7} />
      </motion.div>
    </article>
  );
}
