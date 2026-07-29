"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Projects" },
  { href: "/get-involved", label: "Get Involved" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    const previousTouch = document.body.style.touchAction;
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = previous;
      document.body.style.touchAction = previousTouch;
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <nav aria-label="Primary" className="container-ph site-nav">
        <Link href="/" className="brand-lockup" aria-label="Equal Horizons home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-sun" />
            <span className="brand-hill brand-hill--back" />
            <span className="brand-hill brand-hill--front" />
          </span>
          <span className="brand-wordmark">Equal Horizons</span>
        </Link>

        <ul className="desktop-nav-links">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href} className={active ? "active" : ""}>
                  {link.label}
                  {active && <motion.span layoutId="nav-active-line" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className="nav-contact">
          Contact <ArrowUpRight size={16} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${open ? "menu-toggle--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      {portalReady && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  id="mobile-navigation"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  exit={{ clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className="mobile-navigation"
                >
                  <div className="container-ph mobile-navigation-inner">
                    <p>Explore the horizon</p>
                    <ul>
                      {LINKS.map((link, index) => (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + index * 0.06 }}
                        >
                          <Link href={link.href}>
                            <span>0{index + 1}</span>
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                    <Link href="/contact" className="mobile-contact-link">
                      Start a conversation <ArrowUpRight size={20} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}
