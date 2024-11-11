/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'window-open': 'windowOpen 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'window-close': 'windowClose 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'start-menu-open': 'startMenuOpen 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'start-menu-close': 'startMenuClose 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        windowOpen: {
          '0%': { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        windowClose: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
        startMenuOpen: {
          '0%': { opacity: 0, transform: 'scale(0.95) translateY(20px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        startMenuClose: {
          '0%': { opacity: 1, transform: 'scale(1) translateY(0)' },
          '100%': { opacity: 0, transform: 'scale(0.95) translateY(20px)' },
        },
      },
    },
  },
  plugins: [],
};