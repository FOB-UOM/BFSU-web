/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bfsu: {
          dark: '#0A0A0A',
          'dark-surface': '#141414',
          light: '#FAF9F6',
          'light-surface': '#FFFFFF',
          primary: '#2D1B10',
          'primary-light': '#3F2718',
          gold: '#D4AF37',
          'gold-dark': '#8A5A00',
          accent: '#FFD700',
          glass: 'rgba(255, 255, 255, 0.05)',
          'glass-border': 'rgba(255, 255, 255, 0.1)',
          'light-glass': 'rgba(255, 255, 255, 0.75)',
          'light-glass-border': 'rgba(45, 27, 16, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
