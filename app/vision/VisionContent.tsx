"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import VisionCard from "@/components/VisionCard";
import Button from "@/components/Button";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export default function VisionContent() {
  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-horizon-gradient-soft">
        <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-horizon/20 blur-3xl animate-float" />
        <div className="container-ph relative py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Our vision</span>
            <h1 className="mt-4 font-sora text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Where we hope to take this next.
            </h1>
            <p className="body-copy mt-6">
              Equal Horizons hasn't launched a product. What follows are
              directions we're actively researching or thinking about —
              each labeled honestly by how far along it is, so you know
              exactly where things stand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATUS KEY */}
      <section className="container-ph py-16">
        <Reveal>
          <div className="flex flex-wrap gap-3 rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="status-pill border-horizon/30 bg-horizon/10 text-horizon">
                in development
              </span>
              <span className="font-inter text-sm text-graphite/70">
                Actively being prototyped and tested
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-pill border-sky/50 bg-sky/20 text-ink">
                exploring
              </span>
              <span className="font-inter text-sm text-graphite/70">
                Early research and feasibility work
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-pill border-ink/15 bg-mist/40 text-ink/70">
                future direction
              </span>
              <span className="font-inter text-sm text-graphite/70">
                A longer-term idea worth watching
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* VISION AREAS */}
      <section className="container-ph pb-24 sm:pb-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <VisionCard
            title="Assistive smart glasses"
            status="exploring"
            description="We're researching lightweight wearable support for people with low vision — object and text recognition that's affordable and unobtrusive, not a novelty gadget."
          />
          <VisionCard
            title="Sign language translation tools"
            status="in development"
            description="Our earliest prototype work is here: real-time translation support designed to ease everyday communication between Deaf and hearing communities."
          />
          <VisionCard
            title="Community accessibility tech"
            status="future direction"
            description="Longer-term thinking about shared infrastructure — from wayfinding to public-space accessibility — that helps entire communities, not just individuals."
          />
          <VisionCard
            title="Affordability research"
            status="in development"
            description="Understanding the real cost barriers behind existing assistive devices, and where nonprofit or open-hardware models could bring prices down."
          />
          <VisionCard
            title="Adaptive interfaces"
            status="exploring"
            description="Looking into interfaces that adjust to different motor, visual, and cognitive needs automatically, instead of requiring separate specialized tools."
          />
          <VisionCard
            title="Educator & caregiver resources"
            status="future direction"
            description="A possible future library of practical, low-cost guidance for the people who support assistive technology users every day."
          />
        </motion.div>
      </section>

      {/* HONESTY NOTE */}
      <section className="bg-mist/40 py-20 sm:py-24">
        <div className="container-ph">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">
              We'd rather be honest than impressive.
            </h2>
            <p className="body-copy mt-5">
              None of the areas above are finished products, and we won't
              describe them that way. As an early-stage nonprofit, our job
              right now is to research carefully, prototype responsibly, and
              stay close to the community we're building for — one honest
              step at a time.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/get-involved">See how to get involved</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
