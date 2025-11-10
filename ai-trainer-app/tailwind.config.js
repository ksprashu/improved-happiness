/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy theme based on ethos
        earth: {
          50: '#f9f8f6',
          100: '#f2efe9',
          200: '#e6e0d3',
          300: '#d5cbb5',
          400: '#c2b393',
          500: '#ad9975',
          600: '#9c8563',
          700: '#826e53',
          800: '#6b5a46',
          900: '#574a3b',
          950: '#2e271f',
        },
        clay: {
           500: '#b35d35', // Terracotta-ish for accents
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
