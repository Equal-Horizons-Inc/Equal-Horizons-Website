import type { Metadata } from "next";
import VisionContent from "./VisionContent";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "The future directions Equal Horizons is exploring — clearly labeled by stage, with no products launched yet.",
};

export default function VisionPage() {
  return <VisionContent />;
}
