/** @type {import('tailwindcss').Config} */
export default {
  // DashboardLayout toggles `document.documentElement.classList.toggle('dark', …)`
  // itself, so Tailwind must use the class strategy (not the OS media query).
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
