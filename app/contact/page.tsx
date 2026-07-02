import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Equal Horizons to volunteer, mentor, partner, sponsor, or share feedback.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-horizon-gradient-soft">
        <div className="pointer-events-none absolute -left-16 top-6 h-64 w-64 rounded-full bg-horizon/20 blur-3xl animate-float" />
        <div className="container-ph relative py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Contact</span>
            <h1 className="mt-4 font-sora text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Let's talk.
            </h1>
            <p className="body-copy mt-6">
              Whether you have a question, an idea, or you're ready to get
              involved — we read every message ourselves and respond
              personally.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-ph py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="space-y-8 lg:col-span-2">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-horizon/10 text-horizon">
                <Mail size={20} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-sora text-base font-semibold text-ink">
                  Email
                </h2>
                <p className="mt-1 font-inter text-sm text-graphite/75">
                  Use the form and it'll land directly in our inbox — we
                  aim to reply within a few days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-horizon/10 text-horizon">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-sora text-base font-semibold text-ink">
                  Based remotely
                </h2>
                <p className="mt-1 font-inter text-sm text-graphite/75">
                  Equal Horizons is an early-stage, distributed initiative —
                  we work with volunteers and partners wherever they are.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
