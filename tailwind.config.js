const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      scrollbar: {
        DEFAULT: "#4B5563", // Thumb color
        track: "#E5E7EB", // Track color
      },
    },
  },
  plugins: [
    // ....
    require("tailwind-scrollbar"),
  ],
  darkMode: "class",
  plugins: [nextui()],
};
