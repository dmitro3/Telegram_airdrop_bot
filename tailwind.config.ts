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
        "main": "#FF594B",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-card": "linear-gradient(90deg,rgba(50,46,53,.5),rgba(15,23,42,.4) 47%,rgba(15,23,42,.4))"
      },
      boxShadow: {
        "km": "1px -19px 16px 1px rgb(17,24,39,1)",
        "yellow": "1px -19px 16px 1px rgba(243,186,47,0.3)",
        "1xl": "1px -1px 13px 3px #111"
      },
      fontFamily: {
        "gta": "GT America Mono,system-ui,sans-serif",
        "Inter": "Inter, sans-serif"
      }
    },
  },
  plugins: [],
};
export default config;
