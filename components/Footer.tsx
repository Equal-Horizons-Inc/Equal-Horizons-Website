import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="container-ph grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-sora text-lg font-bold">Equal Horizons</p>
          <p className="mt-3 max-w-sm font-inter text-sm leading-relaxed text-white/70">
            An early-stage nonprofit initiative working to make assistive
            technology more affordable, practical, and accessible for the
            people who need it most.
          </p>
        </div>

        <div>
          <p className="font-sora text-sm font-semibold uppercase tracking-wide text-sky">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-inter text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sora text-sm font-semibold uppercase tracking-wide text-sky">
            Get in touch
          </p>
          <p className="mt-4 font-inter text-sm text-white/70">
            Have a question, an idea, or want to help build this with us?
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Reach out
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ph flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="font-inter text-xs text-white/50">
            © {new Date().getFullYear()} Equal Horizons. An early-stage
            nonprofit initiative.
          </p>
          <p className="font-inter text-xs text-white/50">
            Built for accessibility, from the ground up.
          </p>
        </div>
      </div>
    </footer>
  );
}
