"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  MessageCircle,
  MoveRight,
  PersonStanding,
  Users2,
} from "lucide-react";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import HorizonVisual from "@/components/HorizonVisual";
import VisionCard from "@/components/VisionCard";
import FounderCard from "@/components/FounderCard";
import { fadeIn, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const VALUES = [
  {
    icon: PersonStanding,
    title: "Independence",
    description:
      "Tools should extend what people can already do on their own, not replace their agency.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    description:
      "Being understood shouldn't come with a price tag or a steep learning curve.",
  },
  {
    icon: Compass,
    title: "Mobility",
    description:
      "Getting where you need to go should feel possible in more places, more often.",
  },
  {
    icon: Users2,
    title: "Inclusion",
    description:
      "Assistive technology works best when it's built with the community it serves, not just for it.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-horizon-gradient-soft">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/30 blur-3xl animate-floatSlow" />
        <div className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-full bg-horizon/20 blur-3xl animate-float" />

        <div className="container-ph relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.span variants={staggerItem} className="eyebrow">
              {/* <span className="h-1.5 w-1.5 rounded-full bg-horizon" /> */}
              Early-stage nonprofit initiative
            </motion.span>

            <motion.h1
              variants={staggerItem}
              className="mt-5 font-sora text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]"
            >
              Technology that makes independence accessible.
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl font-inter text-lg leading-relaxed text-graphite/80"
            >
              Equal Horizons is building a future where assistive technology
              is practical, affordable, and designed around the people who
              need it most.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="#mission">Learn More</Button>
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="relative"
          >
            <HorizonVisual />
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="container-ph scroll-mt-24 py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <span className="eyebrow">Our mission</span>
            <h2 className="section-heading mt-4">
              Assistive technology, without the barriers.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <p className="body-copy">
              Too many people who could benefit from assistive technology are
              priced out, overlooked, or left to navigate clunky, outdated
              tools. Equal Horizons exists to close that gap — starting with
              research and relationships, not assumptions.
            </p>
            <p className="body-copy mt-5">
              We're an early-stage initiative. That means our work right now
              is about listening closely to the disability community,
              understanding where existing technology falls short, and
              carefully shaping ideas worth building — before we ever claim
              to have the answer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE CARE ABOUT */}
      <section className="bg-mist/40 py-24 sm:py-28">
        <div className="container-ph">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">What we care about</span>
            <h2 className="section-heading mt-4">
              Four principles guide every idea we pursue.
            </h2>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                className="group rounded-xl2 border border-ink/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-horizon/10 text-horizon transition-colors duration-300 group-hover:bg-horizon group-hover:text-white">
                  <v.icon size={22} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-sora text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2.5 font-inter text-sm leading-relaxed text-graphite/75">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VISION PREVIEW */}
      <section className="container-ph py-24 sm:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Looking ahead</span>
            <h2 className="section-heading mt-4">
              Ideas we're exploring for the future.
            </h2>
          </div>
          <Link
            href="/vision"
            className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-horizon hover:text-ink"
          >
            Read our full vision
            <MoveRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <VisionCard
            title="Assistive smart glasses"
            status="exploring"
            description="Early concepts for lightweight, affordable wearable support for people with low vision — focused on everyday practicality over novelty."
          />
          <VisionCard
            title="Sign language translation tools"
            status="in development"
            description="Prototyping real-time translation support to ease communication gaps between Deaf and hearing communities."
          />
          <VisionCard
            title="Community accessibility tech"
            status="future direction"
            description="Longer-term thinking about shared, local infrastructure that makes public spaces easier to navigate for everyone."
          />
        </motion.div>
      </section>

      {/* FOUNDERS PREVIEW */}
      <section className="bg-mist/40 py-24 sm:py-28">
        <div className="container-ph">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Who's behind this</span>
            <h2 className="section-heading mt-4">Founded by students who wanted to build something that mattered.</h2>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-14 grid gap-6 sm:grid-cols-2"
          >
            <FounderCard
              initials="MB"
              name="Mithilesh Bhasker"
              role="Co-Founder"
              bio="Drives the research and product thinking behind Equal Horizons, working closely with the disability community to shape ideas worth pursuing."
            />
            <FounderCard
              initials="SS"
              name="Sahil Singla"
              role="Co-Founder"
              bio="Focused on partnerships and how Equal Horizons grows responsibly — building relationships before building products."
            />
          </motion.div>

          <Reveal delay={0.15} className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-horizon hover:text-ink"
            >
              More about our story
              <MoveRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-horizon-gradient py-24 sm:py-28">
        <div className="grain absolute inset-0" />
        <div className="container-ph relative text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
              Help us build a more accessible future.
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-white/85 sm:text-lg">
              We're just getting started — and we'd rather build this with
              the community than for it. If that sounds like something you
              want to be part of, we'd love to hear from you.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-inter text-sm font-semibold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Get Involved
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3.5 font-inter text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
