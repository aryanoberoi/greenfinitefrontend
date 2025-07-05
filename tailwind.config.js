/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Inter"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
        primary: ['var(--font-primary)', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
