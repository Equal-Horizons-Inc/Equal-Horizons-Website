import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Equal Horizons — Accessible Assistive Technology",
    template: "%s | Equal Horizons",
  },
  description:
    "Equal Horizons is a student-founded, early-stage initiative exploring assistive technology that is affordable, accessible, and designed around real human needs.",
  metadataBase: new URL("https://equalhorizons.org"),
  openGraph: {
    title: "Equal Horizons",
    description:
      "A student-founded initiative exploring affordable, accessible, human-centered assistive technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper font-inter text-graphite antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
