import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // muted, handcrafted palette
        ink: "#24323a", // deep slate — headings, dark surfaces
        horizon: "#7C5A3E", // muted warm accent — actions, links
        sky: "#C8DDCC", // soft sage — highlights
        mist: "#E9F0EE", // pale wash — backgrounds, dividers
        paper: "#FCFBF9", // near-white page background
        graphite: "#33414A", // body text on light backgrounds
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
          "50%": { transform: "translateY(-8px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-6px) translateX(4px)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        floatSlow: "floatSlow 14s ease-in-out infinite",
        drift: "drift 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
