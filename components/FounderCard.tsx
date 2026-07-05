import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";

export default function FounderCard({
  name,
  role,
  bio,
  initials,
}: {
  name: string;
  role: string;
  bio: string;
  initials: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="group flex flex-col items-start rounded-xl2 border border-ink/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-horizon-gradient font-sora text-lg font-bold text-white shadow-sm">
        {initials}
      </div>
      <h3 className="mt-5 font-sora text-xl font-semibold text-ink">
        {name}
      </h3>
      <p className="mt-1 font-inter text-sm font-medium uppercase tracking-wide text-horizon">
        {role}
      </p>
      <p className="mt-4 font-inter text-sm leading-relaxed text-graphite/75">
        {bio}
      </p>
    </motion.div>
  );
}
