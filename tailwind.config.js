/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
