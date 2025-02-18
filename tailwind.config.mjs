/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm360: "360px",
        sm480: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        light: {
          background: "#F9FAFB",
          modeButtonBackground: "#E5E7EB",
          hoverOverModeButtonBackground: "#D1D5DB",
          modeButtonIcon: "#374151",
          text: "#111827",
          primary: "#1DA1F2",
          secondary: "#1DB954",
          cardsBackground: "#ffffff",
          secondaryText: "#6B7280",
          red: "#ff4d4f",
        },
        dark: {
          background: "#18191A",
          modeButtonBackground: "#3F3F46",
          hoverOverModeButtonBackground: "#27272A",
          modeButtonIcon: "#E5E7EB",
          text: "#E4E6EB",
          primary: "#8AB4F8",
          secondary: "#1DB954",
          cardsBackground: "#000000",
          secondaryText: "#9CA3AF",
          red: "#a8071a",
        },
      },
    },
  },
  plugins: [],
};
