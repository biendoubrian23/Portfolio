/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'meelo-purple': '#E5DFF5',
        'meelo-green': '#F0F5E6',
        'meelo-pink': '#F5E5F0',
        'meelo-blue': '#E5F0F5',
        'meelo-orange': '#FF6B35',
        'meelo-beige': '#FFF8F0',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
