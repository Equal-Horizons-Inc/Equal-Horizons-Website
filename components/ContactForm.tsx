"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const REASONS = [
  "General Inquiry",
  "Volunteer",
  "Mentor",
  "Partner",
  "Sponsor",
  "Future Testing",
  "Share Feedback",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefillReason = searchParams.get("reason");

  const [reason, setReason] = useState("General Inquiry");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (prefillReason && REASONS.includes(prefillReason)) {
      setReason(prefillReason);
    }
  }, [prefillReason]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: if filled, silently "succeed" without sending anything.
    if (String(data.get("company_website") || "").trim().length > 0) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      fullName: String(data.get("fullName") || ""),
      email: String(data.get("email") || ""),
      organization: String(data.get("organization") || ""),
      reason: String(data.get("reason") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setReason("General Inquiry");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-xl2 border border-ink/10 bg-white p-7 shadow-sm sm:p-9"
    >
      {/* Honeypot field — hidden from real users, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block font-inter text-sm font-medium text-ink"
          >
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 font-inter text-sm text-graphite placeholder:text-graphite/40 focus:border-horizon"
            placeholder="Jordan Lee"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-inter text-sm font-medium text-ink"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 font-inter text-sm text-graphite placeholder:text-graphite/40 focus:border-horizon"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="organization"
            className="block font-inter text-sm font-medium text-ink"
          >
            Organization{" "}
            <span className="font-normal text-graphite/50">(optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 font-inter text-sm text-graphite placeholder:text-graphite/40 focus:border-horizon"
            placeholder="School, company, or organization"
          />
        </div>

        <div>
          <label
            htmlFor="reason"
            className="block font-inter text-sm font-medium text-ink"
          >
            Reason for reaching out
          </label>
          <select
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 font-inter text-sm text-graphite focus:border-horizon"
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-inter text-sm font-medium text-ink"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y rounded-lg border border-ink/15 bg-paper px-4 py-3 font-inter text-sm text-graphite placeholder:text-graphite/40 focus:border-horizon"
          placeholder="Tell us a bit about what you're hoping to do together."
        />
      </div>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className="min-h-[1.5rem] font-inter text-sm"
        >
          {status === "success" && (
            <span className="text-horizon">
              Thanks for reaching out — we'll be in touch soon.
            </span>
          )}
          {status === "error" && (
            <span className="text-red-600">{errorMessage}</span>
          )}
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 font-inter text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-horizon hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </motion.form>
  );
}
