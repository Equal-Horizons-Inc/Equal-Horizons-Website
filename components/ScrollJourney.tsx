"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "Listen",
    title: "Begin with a real day, not a feature list.",
    copy: "The first step is understanding routines, frustrations, environments, and goals from the people who would actually use the technology.",
  },
  {
    number: "02",
    label: "Shape",
    title: "Turn what we hear into a small, testable idea.",
    copy: "Instead of designing a giant solution at once, we narrow the problem and make the smallest useful concept that can start a meaningful conversation.",
  },
  {
    number: "03",
    label: "Build",
    title: "Prototype for comfort, cost, and everyday use.",
    copy: "A prototype is judged by more than novelty. It has to consider affordability, repairability, clarity, and whether it fits naturally into daily life.",
  },
  {
    number: "04",
    label: "Learn",
    title: "Share what worked, what failed, and what comes next.",
    copy: "Early-stage work should stay honest. Feedback and open learning help the next version become more useful without pretending the answer is already finished.",
  },
];

export default function ScrollJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 20%", "end 80%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value: number) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActiveStep(next);
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.5,
  });
  const sunX = useTransform(smoothProgress, [0, 1], ["12%", "73%"]);
  const sunY = useTransform(smoothProgress, [0, 0.48, 1], ["54%", "18%", "42%"]);
  const cloudX = useTransform(smoothProgress, [0, 1], ["4%", "-14%"]);
  const islandY = useTransform(smoothProgress, [0, 1], [20, -18]);
  const islandRotate = useTransform(smoothProgress, [0, 1], [-2, 3]);
  const routeScale = useTransform(smoothProgress, [0, 1], [0.04, 1]);
  const bloomScale = useTransform(smoothProgress, [0.56, 0.82], [0.35, 1]);
  const bloomOpacity = useTransform(smoothProgress, [0.48, 0.66], [0, 1]);
  const artBackground = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#dff5ff", "#fff4bf", "#d9f2cf"]
  );

  return (
    <section ref={rootRef} className="journey-section" id="process">
      <div className="container-ph journey-grid">
        <div className="journey-sticky">
          <p className="editorial-index">02 / HOW AN IDEA MOVES</p>
          <h2 className="journey-heading">
            A path from listening to <em>learning.</em>
          </h2>
          <p className="journey-intro">
            Scroll through the process. The scene changes as each step moves the
            idea closer to something useful.
          </p>

          <motion.div
            className="journey-art"
            style={reduceMotion ? undefined : { backgroundColor: artBackground }}
            aria-hidden="true"
          >
            <div className="journey-sky-lines" />
            <motion.div
              className="journey-cloud journey-cloud--one"
              style={reduceMotion ? undefined : { x: cloudX }}
            />
            <motion.div
              className="journey-cloud journey-cloud--two"
              style={reduceMotion ? undefined : { x: cloudX }}
            />
            <motion.div
              className="journey-sun"
              style={reduceMotion ? undefined : { left: sunX, top: sunY }}
            />

            <motion.div
              className="journey-floating-island"
              style={
                reduceMotion
                  ? undefined
                  : { y: islandY, rotate: islandRotate }
              }
            >
              <span className="journey-tree-trunk" />
              <span className="journey-tree-crown" />
              <motion.span
                className="journey-bloom"
                style={
                  reduceMotion
                    ? undefined
                    : { scale: bloomScale, opacity: bloomOpacity }
                }
              >
                <i />
                <i />
                <i />
                <i />
                <b />
              </motion.span>
            </motion.div>

            <div className="journey-hill journey-hill--far" />
            <div className="journey-hill journey-hill--near" />

            <div className="journey-route">
              <motion.span
                className="journey-route-fill"
                style={reduceMotion ? undefined : { scaleX: routeScale }}
              />
              {steps.map((step, index) => (
                <span
                  key={step.number}
                  className={`journey-route-point ${
                    index <= activeStep ? "is-active" : ""
                  }`}
                  style={{ left: `${index * 32.4}%` }}
                />
              ))}
            </div>
          </motion.div>

        </div>

        <div className="journey-steps">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              className={`journey-step ${index === activeStep ? "is-active" : ""}`}
              initial={{ opacity: 0.35, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.55, margin: "-10% 0px -10%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="journey-step-number">{step.number}</div>
              <p className="journey-step-label">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
