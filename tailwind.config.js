/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redish: "#792454",
        blueish: "#314665",
        purpleish: "#45406B",
        dark: "#2F4858",
      },
      animation: {
        "spin-slow": "spin 1s ease-in-out infinite",
      },
    },
    container: {
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
