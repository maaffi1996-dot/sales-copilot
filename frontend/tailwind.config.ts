import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        ink: "#1C1330",
        inkSoft: "#6B6280",
        inkFaint: "#9C93AF",
        violet: "#6B21A8",
        violetDeep: "#4C1863",
        violetBright: "#8B5CF6",
        lilac: "#EDE6FB",
        lilacLine: "#E3DAF5",
        rose: "#A21B6D",
        roseSoft: "#F7E4EF",
        bgWash: "#FBFAFE",
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
