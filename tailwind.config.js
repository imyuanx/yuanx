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
        'gradient-0':
          'linear-gradient(-45deg, #0bd1ff 0%, #ffa3ff 50%, #ffd34e 100%)',
        'gradient-1': 'linear-gradient(-45deg, #ffdc99 0%, #ff62c0 100%)',
        'gradient-2': 'linear-gradient(-45deg, #eaeaea 0%, #8b8b8b 100%)',
        'gradient-3': 'linear-gradient(-45deg, #dde4ff 0%, #8da2ee 100%)',
        'gradient-4': 'linear-gradient(-45deg, #97e8b5 0%, #5cb67f 100%)',
        'gradient-5': 'linear-gradient(-45deg, #b7dcff 0%, #ffa4f6 100%)',
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
  plugins: [ThreeDimensional],
  darkMode: ['class'],
  safelist: [
    'bg-gradient-0',
    'bg-gradient-1',
    'bg-gradient-2',
    'bg-gradient-3',
    'bg-gradient-4',
    'bg-gradient-5',
  ],
};
