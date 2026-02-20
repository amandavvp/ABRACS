import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        abracs: {
          blue: {
            50: "#EEF3FF",
            100: "#D8E2F8",
            200: "#B0C4F0",
            300: "#7A9BE0",
            400: "#4A72CC",
            500: "#2952A3",
            600: "#1E4A94",
            700: "#1B3C73",
            800: "#142D58",
            900: "#0F1F3D",
            950: "#081428",
          },
          gold: {
            50: "#FFF9E6",
            100: "#FFF0BF",
            200: "#FFE080",
            300: "#F5D060",
            400: "#E5B820",
            500: "#D4A61D",
            600: "#B8901E",
            700: "#8C6D17",
            800: "#614C10",
            900: "#3D3009",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
