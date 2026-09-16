"use client";

import { motion } from "framer-motion";
import {
  ClipboardText,
  Handshake,
  Heart,
  ChatDots,
  Sparkle,
  Users,
} from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import InvolvedCard from "@/components/InvolvedCard";
import { staggerContainer, viewportOnce } from "@/lib/motion";

const OPTIONS = [
  {
    icon: <Heart size={22} weight="duotone" aria-hidden="true" />,
    title: "Volunteer",
    description:
      "Lend your time to research, outreach, or early-stage projects that need extra hands.",
    reason: "Volunteer",
  },
  {
    icon: <Users size={22} weight="duotone" aria-hidden="true" />,
    title: "Mentor",
    description:
      "Share domain expertise — accessibility, hardware, community partnerships — with a young team that's building carefully.",
    reason: "Mentor",
  },
  {
    icon: <Handshake size={22} weight="duotone" aria-hidden="true" />,
    title: "Partner",
    description:
      "Represent an organization, school, or advocacy group interested in collaborating with us.",
    reason: "Partner",
  },
  {
    icon: <Sparkle size={22} weight="duotone" aria-hidden="true" />,
    title: "Sponsor",
    description:
      "Help fund the research and early prototyping that makes everything else possible.",
    reason: "Sponsor",
  },
  {
    icon: <ClipboardText size={22} weight="duotone" aria-hidden="true" />,
    title: "Future Testing",
    description:
      "Ask to be considered for early feedback sessions once we have something ready to test.",
    reason: "Future Testing",
  },
  {
    icon: <ChatDots size={22} weight="duotone" aria-hidden="true" />,
    title: "Share Feedback",
    description:
      "Tell us what's missing from assistive technology today. Lived experience shapes our direction more than anything else.",
    reason: "Share Feedback",
  },
];

export default function GetInvolvedContent() {
  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-horizon-gradient-soft">
        <div className="pointer-events-none absolute -right-20 top-6 h-72 w-72 rounded-full bg-sky/30 blur-3xl animate-floatSlow" />
        <div className="container-ph relative py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Get involved</span>
            <h1 className="mt-4 font-sora text-4xl font-bold leading-tight text-ink sm:text-5xl">
              There's a place for you in this, right now.
            </h1>
            <p className="body-copy mt-6">
              Equal Horizons is early, and that's exactly why involvement
              matters so much. Pick what fits, and we'll follow up
              personally — no forms into a void.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CARDS */}
      <section className="container-ph py-24 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OPTIONS.map((opt) => (
            <InvolvedCard key={opt.title} {...opt} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
