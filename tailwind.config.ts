import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#293681", // deep indigo — headings, dark surfaces
        horizon: "#4274D9", // primary blue — actions, links
        sky: "#95CCDD", // light accent — highlights, secondary
        mist: "#D0E7E6", // pale wash — backgrounds, dividers
        paper: "#FBFCFC", // near-white page background
        graphite: "#1C2340", // body text on light backgrounds
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "horizon-gradient":
          "linear-gradient(180deg, #293681 0%, #4274D9 45%, #95CCDD 78%, #D0E7E6 100%)",
        "horizon-gradient-soft":
          "linear-gradient(180deg, #D0E7E6 0%, #FBFCFC 60%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(41, 54, 129, 0.25)",
        lift: "0 24px 48px -16px rgba(41, 54, 129, 0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-10px) translateX(6px)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 10s ease-in-out infinite",
        drift: "drift 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
