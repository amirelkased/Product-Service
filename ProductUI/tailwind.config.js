/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Adjust to include all Angular HTML and TypeScript files
    "./src/app/**/*.html",
    "./src/app/**/*.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
