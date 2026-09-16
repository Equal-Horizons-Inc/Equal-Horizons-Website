"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import AnimeHorizonScene from "@/components/AnimeHorizonScene";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SpatialProjectDeck from "@/components/SpatialProjectDeck";
import { staggerContainer, staggerItem } from "@/lib/motion";

const ImmersiveHorizon3D = dynamic(() => import("@/components/ImmersiveHorizon3D"), { ssr: false });
const PrototypeLab3D = dynamic(() => import("@/components/PrototypeLab3D"), { ssr: false });

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 80, damping: 24, mass: 0.5 });
  const heroCopyY = useTransform(smoothY, [0, 720], [0, -96]);
  const heroCopyOpacity = useTransform(smoothY, [0, 530, 790], [1, 0.88, 0]);
  const sceneY = useTransform(smoothY, [0, 720], [0, 92]);
  const sceneScale = useTransform(smoothY, [0, 720], [1, 0.91]);
  const orbRotate = useTransform(smoothY, [0, 720], [0, 44]);

  return (
    <>
      <ScrollProgress />

      <section className="hero-shell hero-shell--ultimate">
        <div className="hero-sun-wash" aria-hidden="true" />
        <motion.div className="hero-3d-orbit hero-3d-orbit--a" style={reduceMotion ? undefined : { rotate: orbRotate }} aria-hidden="true" />
        <motion.div className="hero-3d-orbit hero-3d-orbit--b" style={reduceMotion ? undefined : { rotate: orbRotate }} aria-hidden="true" />

        <div className="container-ph hero-layout">
          <motion.div style={reduceMotion ? undefined : { y: heroCopyY, opacity: heroCopyOpacity }}>
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="hero-copy">
              <motion.div variants={staggerItem} className="hero-live-pill"><i /> STUDENT-FOUNDED · ACCESSIBILITY-FIRST</motion.div>
              <motion.h1 variants={staggerItem} className="hero-title">
                Different paths.
                <br />
                One shared <span>horizon.</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="hero-lede">
                Equal Horizons explores assistive technology that is more affordable, accessible, and grounded in how people actually live.
              </motion.p>

              <motion.div variants={staggerItem} className="hero-actions">
                <Link href="#mission" className="action-button action-button--primary">
                  Explore the mission <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
                </Link>
                <Link href="/get-involved" className="action-button action-button--ghost">
                  Get involved <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </Link>
              </motion.div>

              <motion.div variants={staggerItem} className="hero-footnote">
                <div className="mini-horizon-mark" aria-hidden="true"><span /><span /></div>
                <p>Built with community,<br />not assumptions.</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 36, rotateY: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1.15, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hero-scene-wrap hero-scene-wrap--ultimate"
            style={reduceMotion ? undefined : { y: sceneY, scale: sceneScale }}
          >
            <div className="hero-scene-halo" aria-hidden="true" />
            <AnimeHorizonScene />
            <div className="hero-float-tag hero-float-tag--one"><span>01</span> HUMAN-CENTERED</div>
            <div className="hero-float-tag hero-float-tag--two"><span>02</span> OPEN BY DEFAULT</div>
            <div className="hero-float-tag hero-float-tag--three"><span>03</span> USEFUL FIRST</div>
          </motion.div>
        </div>

        <div className="container-ph hero-bottom-rail">
          <p>Accessibility should feel like an open landscape—not a locked door.</p>
          <div className="hero-rail-line" />
          <span>Scroll into 3D</span>
        </div>
      </section>

      <section id="mission" className="mission-section mission-section--ultimate">
        <div className="container-ph mission-grid">
          <Reveal className="mission-copy-block">
            <p className="editorial-index">01 / WHY WE EXIST</p>
            <h2 className="display-heading">Technology should open doors,<span> not create new barriers.</span></h2>
            <div className="mission-body-grid">
              <p>Too many assistive tools are expensive, hard to find, difficult to customize, or designed without enough input from the people expected to use them.</p>
              <p>Equal Horizons is starting with listening, research, and small prototypes. The goal is not to promise finished answers—it is to learn responsibly and build better questions with the community.</p>
            </div>
            <Link href="/about" className="text-link">Read our story <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
          </Reveal>

          <Reveal delay={0.12} className="horizon-window horizon-window--ultimate" aria-label="A stylized open arch looking toward a bright horizon">
            <div className="window-depth-plane window-depth-plane--back" />
            <div className="window-depth-plane window-depth-plane--mid" />
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
            <div className="window-depth-label">MOVE TOWARD THE OPENING ↗</div>
          </Reveal>
        </div>
      </section>

      <ImmersiveHorizon3D />
      <PrototypeLab3D />
      <SpatialProjectDeck />

      <section className="founders-section founders-section--ultimate">
        <div className="container-ph founders-grid">
          <Reveal>
            <p className="editorial-index">05 / STUDENT-FOUNDED</p>
            <h2 className="display-heading">Curious enough to ask.<span> Careful enough to listen.</span></h2>
          </Reveal>
          <Reveal delay={0.1} className="founder-list">
            <div className="founder-line"><span>MB</span><div><h3>Mithilessh Saai Bhasker</h3><p>Co-Founder · Research and product thinking</p></div><i>↗</i></div>
            <div className="founder-line"><span>SS</span><div><h3>Sahil Singla</h3><p>Co-Founder · Partnerships and responsible growth</p></div><i>↗</i></div>
            <Link href="/about" className="text-link">Meet the founders <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="sunrise-cta sunrise-cta--ultimate">
        <div className="cta-cloud cta-cloud--one" aria-hidden="true" />
        <div className="cta-cloud cta-cloud--two" aria-hidden="true" />
        <div className="container-ph sunrise-cta-inner">
          <Reveal className="sunrise-cta-copy">
            <p className="editorial-index">THE NEXT HORIZON</p>
            <h2>Bring your experience, curiosity, or expertise.</h2>
            <p>Equal Horizons is looking for mentors, collaborators, volunteers, and people willing to share thoughtful accessibility feedback.</p>
            <div className="hero-actions">
              <Link href="/get-involved" className="action-button action-button--primary">Find your way in <ArrowUpRight size={18} weight="bold" aria-hidden="true" /></Link>
              <Link href="/contact" className="action-button action-button--ghost">Start a conversation</Link>
            </div>
          </Reveal>
        </div>
        <div className="cta-hills" aria-hidden="true"><span className="cta-hill cta-hill--one" /><span className="cta-hill cta-hill--two" /><span className="cta-hill cta-hill--three" /></div>
      </section>
    </>
  );
}
