import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8edf5",
          100: "#c5d0e6",
          500: "#2a5298",
          700: "#163a7a",
          900: "#0f2b5b",
        },
        gold: {
          400: "#e8c56a",
          500: "#c9a84c",
          600: "#a88830",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
