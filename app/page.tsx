"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";
import AnimeHorizonScene from "@/components/AnimeHorizonScene";
import ProjectScrollRow, { type ProjectScrollRowProps } from "@/components/ProjectScrollRow";
import Reveal from "@/components/Reveal";
import ScrollJourney from "@/components/ScrollJourney";
import ScrollProgress from "@/components/ScrollProgress";
import { staggerContainer, staggerItem } from "@/lib/motion";


const projects: ProjectScrollRowProps[] = [
  {
    index: "01",
    status: "Exploration",
    title: "Assistive smart glasses",
    copy: "An early-stage concept for lightweight visual, audio, and navigation support built around affordability and real daily routines.",
    art: "glasses",
  },
  {
    index: "02",
    status: "Research",
    title: "Communication tools",
    copy: "Exploring interfaces that bridge text, sound, gesture, and visual communication without forcing people into one rigid workflow.",
    art: "signals",
  },
  {
    index: "03",
    status: "Future direction",
    title: "Affordable hardware",
    copy: "Investigating modular parts, open designs, and student engineering approaches that could lower barriers to useful assistive devices.",
    art: "hardware",
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <section className="hero-shell">
        <div className="hero-sun-wash" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="container-ph hero-layout">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="hero-copy"
          >
            <motion.h1 variants={staggerItem} className="hero-title">
              Different paths.
              <br />
              One shared <span>horizon.</span>
            </motion.h1>

            <motion.p variants={staggerItem} className="hero-lede">
              Equal Horizons explores assistive technology that is more
              affordable, accessible, and grounded in how people actually live.
            </motion.p>

            <motion.div variants={staggerItem} className="hero-actions">
              <Link href="#mission" className="action-button action-button--primary">
                Explore the mission
                <ArrowDownRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/get-involved" className="action-button action-button--ghost">
                Get involved
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div variants={staggerItem} className="hero-footnote">
              <div className="mini-horizon-mark" aria-hidden="true">
                <span />
                <span />
              </div>
              <p>
                Built with community,
                <br />
                not assumptions.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hero-scene-wrap"
          >
            <AnimeHorizonScene />
          </motion.div>
        </div>

        <div className="container-ph hero-bottom-rail">
          <p>Accessibility should feel like an open landscape—not a locked door.</p>
          <div className="hero-rail-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section id="mission" className="mission-section">
        <div className="container-ph mission-grid">
          <Reveal className="mission-copy-block">
            <p className="editorial-index">01 / WHY WE EXIST</p>
            <h2 className="display-heading">
              Technology should open doors,
              <span> not create new barriers.</span>
            </h2>
            <div className="mission-body-grid">
              <p>
                Too many assistive tools are expensive, hard to find, difficult
                to customize, or designed without enough input from the people
                expected to use them.
              </p>
              <p>
                Equal Horizons is starting with listening, research, and small
                prototypes. The goal is not to promise finished answers—it is to
                learn responsibly and build better questions with the community.
              </p>
            </div>
            <Link href="/about" className="text-link">
              Read our story <MoveRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.12} className="horizon-window" aria-label="A stylized open arch looking toward a bright horizon">
            <div className="window-sky">
              <div className="window-sun" />
              <div className="window-cloud window-cloud--one" />
              <div className="window-cloud window-cloud--two" />
              <div className="window-hill window-hill--far" />
              <div className="window-hill window-hill--near" />
              <div className="window-path" />
              <span className="window-petal window-petal--one" />
              <span className="window-petal window-petal--two" />
              <span className="window-petal window-petal--three" />
            </div>
          </Reveal>
        </div>
      </section>

      <ScrollJourney />

      <section className="projects-section">
        <div className="container-ph">
          <Reveal className="projects-intro">
            <div>
              <p className="editorial-index">03 / AREAS OF EXPLORATION</p>
              <h2 className="display-heading">Ideas in motion, not finished products.</h2>
            </div>
            <p>
              Each direction is clearly labeled because honest early-stage work
              should show what is known, what is being tested, and what remains open.
            </p>
          </Reveal>

          <div className="project-ledger">
            {projects.map((project) => (
              <ProjectScrollRow key={project.index} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="founders-section">
        <div className="container-ph founders-grid">
          <Reveal>
            <p className="editorial-index">04 / STUDENT-FOUNDED</p>
            <h2 className="display-heading">
              Curious enough to ask.
              <span> Careful enough to listen.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="founder-list">
            <div className="founder-line">
              <span>MB</span>
              <div>
                <h3>Mithilessh Saai Bhasker</h3>
                <p>Co-Founder · Research and product thinking</p>
              </div>
            </div>
            <div className="founder-line">
              <span>SS</span>
              <div>
                <h3>Sahil Singla</h3>
                <p>Co-Founder · Partnerships and responsible growth</p>
              </div>
            </div>
            <Link href="/about" className="text-link">
              Meet the founders <MoveRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="sunrise-cta">
        <div className="cta-cloud cta-cloud--one" aria-hidden="true" />
        <div className="cta-cloud cta-cloud--two" aria-hidden="true" />
        <div className="container-ph sunrise-cta-inner">
          <Reveal className="sunrise-cta-copy">
            <p className="editorial-index">THE NEXT HORIZON</p>
            <h2>Bring your experience, curiosity, or expertise.</h2>
            <p>
              Equal Horizons is looking for mentors, collaborators, volunteers,
              and people willing to share thoughtful accessibility feedback.
            </p>
            <div className="hero-actions">
              <Link href="/get-involved" className="action-button action-button--primary">
                Find your way in <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="action-button action-button--ghost">
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="cta-hills" aria-hidden="true">
          <span className="cta-hill cta-hill--one" />
          <span className="cta-hill cta-hill--two" />
          <span className="cta-hill cta-hill--three" />
        </div>
      </section>
    </>
  );
}
