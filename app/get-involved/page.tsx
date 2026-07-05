import type { Metadata } from "next";
import GetInvolvedContent from "./GetInvolvedContent";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Ways to get involved with Equal Horizons — volunteer, mentor, partner, sponsor, help with future testing, or share feedback.",
};

export default function GetInvolvedPage() {
  return <GetInvolvedContent />;
}
