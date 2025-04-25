/** @type {import('tailwindcss').Config} */
const path = require('path');
const plugin = require('tailwindcss/plugin');

// 3D utilities
const ThreeDimensional = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-none': {
      transform: 'rotateY(0deg)',
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.rotate-y-180-reverse': {
      transform: 'rotateY(-180deg)',
    },
    '.perspective-1000': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
  });
});

module.exports = {
  content: [
    path.join(__dirname, './src/pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './src/components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      maxWidth: {
        'pre-mobile': 'calc(100vw - 56px)',
      },
      backgroundImage: {
        wave: 'url(/wave.png)',
        gradient:
          'linear-gradient(-45deg, #0bd1ff 0%, #ffa3ff 50%, #ffd34e 100%)',
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
  plugins: [ThreeDimensional, require('tailwindcss-animate')],
  darkMode: ['class'],
  safelist: ['bg-gradient'],
};
