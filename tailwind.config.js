/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'textPrimary': '#022E57',
        'textSecondary': '#005A8D',
        'backgroundPrimary': '#FFF5FD',
        'backgroundSecondary': '#FF96AD'
      }
    },
  },
  plugins: [],
}
