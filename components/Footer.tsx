import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

const links = [
  { href: "/about", label: "About" },
  { href: "/vision", label: "Projects" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of service" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-ph footer-main">
        <div className="footer-statement">
          <div className="footer-brand-row">
            <span className="brand-mark brand-mark--footer" aria-hidden="true">
              <span className="brand-sun" />
              <span className="brand-hill brand-hill--back" />
              <span className="brand-hill brand-hill--front" />
            </span>
            <strong>Equal Horizons</strong>
          </div>
          <p>
            A student-founded initiative exploring assistive technology that is
            more affordable, accessible, and grounded in real human needs.
          </p>
        </div>

        <div className="footer-links">
          <p>Navigate</p>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-invite">
          <p>Have experience or an idea worth sharing?</p>
          <Link href="/contact">
            Say hello <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container-ph footer-bottom">
        <p>
          © {new Date().getFullYear()} Equal Horizons. All rights reserved.
        </p>
        <p>
          Early-stage · Student-founded ·{" "}
          <Link href="/terms">Terms of service</Link>
        </p>
      </div>
    </footer>
  );
}
