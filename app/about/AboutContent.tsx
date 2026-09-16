"use client";

import { motion } from "framer-motion";
import {
  HandHeart,
  Lightbulb,
  Chats,
  ShieldCheck,
  Wallet,
} from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import FounderCard from "@/components/FounderCard";
import Button from "@/components/Button";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Accessibility first",
    description:
      "Accessibility isn't a feature we add later — it's the starting requirement for anything we consider building.",
  },
  {
    icon: Wallet,
    title: "Affordability",
    description:
      "Assistive technology only helps people if they can actually afford it. Cost is a design constraint, not an afterthought.",
  },
  {
    icon: HandHeart,
    title: "Human-centered design",
    description:
      "We design around real routines and real constraints, not idealized use cases that only work in a demo.",
  },
  {
    icon: Lightbulb,
    title: "Practical innovation",
    description:
      "We're more interested in technology that quietly works every day than technology that's impressive once.",
  },
  {
    icon: Chats,
    title: "Community feedback",
    description:
      "The disability community isn't a stakeholder we consult once — they're part of how every idea gets shaped and tested.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-horizon-gradient-soft">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sky/30 blur-3xl animate-floatSlow" />
        <div className="container-ph relative py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">About Equal Horizons</span>
            <h1 className="mt-4 font-sora text-4xl font-bold leading-tight text-ink sm:text-5xl">
              We started with a question we couldn't shake.
            </h1>
            <p className="body-copy mt-6">
              Why does assistive technology so often cost more, work worse,
              and feel more like an afterthought than the technology built
              for everyone else?
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="container-ph py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <span className="eyebrow">Our story</span>
            <h2 className="section-heading mt-4">
              A small idea, taken seriously.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 lg:col-span-3">
            <p className="body-copy">
              Equal Horizons began as a conversation between two students who
              noticed the same pattern from very different angles: assistive
              technology that could genuinely change someone's daily life
              often sat out of reach — either priced for institutions, not
              individuals, or designed without much input from the people
              actually using it.
            </p>
            <p className="body-copy">
              Rather than rush toward a product, we started by talking to
              people — users, caregivers, educators, and advocates — about
              what actually gets in the way. That research is still shaping
              everything we do. We'd rather move slowly and build something
              genuinely useful than move fast and build something that
              looks good in a pitch deck.
            </p>
            <p className="body-copy">
              Today, Equal Horizons is a student-founded, early-stage initiative.
              We haven't launched a product yet, and we're not in a hurry to.
              We're building the foundation — relationships, research, and a
              clear sense of what "affordable and accessible" actually
              requires — before we build anything else.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-mist/40 py-24 sm:py-28">
        <div className="container-ph">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Founders</span>
            <h2 className="section-heading mt-4">
              The people building Equal Horizons.
            </h2>
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
              name="Mithilessh Saai Bhasker"
              role="Co-Founder"
              bio="Leads research and product direction for Equal Horizons, spending most of his time listening — to the disability community, to educators, and to the gaps in tools that already exist — before shaping what we build next."
            />
            <FounderCard
              initials="SS"
              name="Sahil Singla"
              role="Co-Founder"
              bio="Focuses on how Equal Horizons grows — partnerships, community relationships, and making sure the organization stays accountable to the people it exists to serve."
            />
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container-ph py-24 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">What guides us</span>
          <h2 className="section-heading mt-4">Our values, in practice.</h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-horizon-gradient py-20 sm:py-24">
        <div className="grain absolute inset-0" />
        <div className="container-ph relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl font-sora text-3xl font-bold text-white sm:text-4xl">
            Want to be part of the next chapter?
          </h2>
          <Button href="/get-involved" variant="secondary" className="!bg-white !text-ink border-0">
            See how to get involved
          </Button>
        </div>
      </section>
    </>
  );
}
