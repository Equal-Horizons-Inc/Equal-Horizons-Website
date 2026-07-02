"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";
import { ReactNode } from "react";

export default function InvolvedCard({
  icon,
  title,
  description,
  reason,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  reason: string;
}) {
  return (
    <motion.div variants={staggerItem} className="h-full">
      <Link
        href={`/contact?reason=${encodeURIComponent(reason)}`}
        className="group flex h-full flex-col justify-between rounded-xl2 border border-ink/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-horizon/30 hover:shadow-lift"
      >
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-horizon group-hover:text-white">
            {icon}
          </div>
          <h3 className="mt-5 font-sora text-lg font-semibold text-ink">
            {title}
          </h3>
          <p className="mt-2.5 font-inter text-sm leading-relaxed text-graphite/75">
            {description}
          </p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-horizon">
          Get started
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
