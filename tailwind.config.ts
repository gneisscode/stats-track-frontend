import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "background-light": "#fffffe",
        "background-blue": "#d8eefe",
        "blue-primary": "#8FB3FF",
        "blue-secondary": "#EBF1FF",
        "text-blue-primary": "#5f6c7b",
        "text-black": "#353535",
        // "heading-blue-primary": "#3B3E79",
        "heading-blue-primary": "#094067",
        "text-red-primary": "#ef4565",
      },
    },

    fontFamily: {
      Khorla: ["Khorla", "sans-serif"],
    },
    // fontWeight: {
    //  "normal": "300",
    //   "medium": "400",
    //   "semibold": "500",
    //   "bold": "600",
    // },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
