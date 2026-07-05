import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Equal Horizons, our founders, and the values that guide how we build.",
};

export default function AboutPage() {
  return <AboutContent />;
}
