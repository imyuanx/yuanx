/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      maxWidth: {
        'pre-mobile': 'calc(100vw - 56px)',
      },
      backgroundImage: {
        wave: 'url(/wave.png)',
      },
      backgroundSize: {
        '16px': '16px',
      },
      backgroundPosition: {
        '0px-bottom': '0px bottom',
      },
      keyframes: {
        wave: {
          '0%': { backgroundPositionX: '2px' },
          '100%': { backgroundPositionX: '50px' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        wave: 'wave 6s infinite linear',
        rotate: 'rotate 12s infinite linear',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: ['class'],
};
