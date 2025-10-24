/***** Tailwind config for Storybook and local development only *****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind.preset.cjs')],
  content: [
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};