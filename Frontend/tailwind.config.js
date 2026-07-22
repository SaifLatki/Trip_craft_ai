/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          950: "#062a2a",
          900: "#0a3d3d",
          800: "#0f5757",
          700: "#157070",
          600: "#1c8a8a",
          500: "#2ba3a3",
        },
        sand: {
          50: "#fdf8f0",
          100: "#faf0dc",
          200: "#f3ddb0",
          300: "#eac67c",
          400: "#e0a94f",
          500: "#d18d2f",
        },
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
