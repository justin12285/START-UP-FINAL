/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1e1e1e',
        primary: '#3b82f6',
        secondary: '#10b981',
      }
    },
  },
  plugins: [],
}
