import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#13233B",
        horizon: "#7056DD",
        sky: "#9EDCFF",
        mist: "#EFF8F2",
        paper: "#FFFDF7",
        graphite: "#40506A",
        sun: "#FFD166",
        leaf: "#55C98A",
        coral: "#FF8FA3",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "horizon-gradient": "linear-gradient(180deg, #9EDCFF 0%, #DDF4FF 48%, #FFF0AF 100%)",
        "horizon-gradient-soft": "linear-gradient(180deg, #E7F8FF 0%, #FFFDF7 68%)",
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(41, 76, 98, 0.25)",
        lift: "0 24px 48px -16px rgba(41, 76, 98, 0.32)",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        floatSlow: { "0%, 100%": { transform: "translateY(0px) translateX(0px)" }, "50%": { transform: "translateY(-6px) translateX(4px)" } },
        drift: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
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
