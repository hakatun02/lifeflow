/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // тема по классу .dark
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        cream: "#FAF3E0",
        mint: "#A8DADC",
        pink: "#FFCAD4",
        textdark: "#3D405B",
        peach: "#FFD6A5",
      },
    },
  },
  plugins: [],
};



