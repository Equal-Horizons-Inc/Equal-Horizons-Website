import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";

export type VisionStatus = "in development" | "exploring" | "future direction";

const STATUS_STYLES: Record<VisionStatus, string> = {
  "in development": "border-horizon/30 bg-horizon/10 text-horizon",
  exploring: "border-sky/50 bg-sky/20 text-ink",
  "future direction": "border-ink/15 bg-mist/40 text-ink/70",
};

export default function VisionCard({
  title,
  status,
  description,
}: {
  title: string;
  status: VisionStatus;
  description: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="group flex h-full flex-col rounded-xl2 border border-ink/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-horizon/30 hover:shadow-lift"
    >
      <span className={`status-pill w-fit ${STATUS_STYLES[status]}`}>
        {status}
      </span>
      <h3 className="mt-5 font-sora text-xl font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-3 font-inter text-sm leading-relaxed text-graphite/75">
        {description}
      </p>
    </motion.div>
  );
}
