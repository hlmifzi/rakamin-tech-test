/* eslint-disable import/no-commonjs, @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@rakamin/ui/tailwind.preset.cjs')],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx,scss}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};