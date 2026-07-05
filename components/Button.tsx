import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-inter text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

  const styles =
    variant === "primary"
      ? "bg-ink text-white shadow-soft hover:bg-horizon hover:shadow-lift"
      : "border border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-horizon/40 hover:text-horizon hover:shadow-soft";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
