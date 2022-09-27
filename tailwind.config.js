/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        '#808080': '#808080',
        '#303030': '#303030',
      },
      padding: {
        '10vh': '10vh',
        '10vw': '10vw',
        '3vh': '3vh',
        '28px': '28px',
        '30px': '30px',
        '60px': '60px',
      },
      fontSize: {
        '20px': '20px',
        '18px': '18px',
        '16px': '16px',
        '1.6em': '1.6em',
        '2em': '2em',
        '4.5em': '4.5em',
      },
      maxWidth: {
        '28em': '28em',
        '650px': '650px',
        '900px': '900px',
      },
      minWidth: {
        '330px': '330px',
      },
      height: {
        '60px': '60px',
      },
      lineHeight: {
        1: '1',
        1.2: '1.2',
        1.4: '1.4',
        1.5: '1.5',
        '18px': '18px',
      },
      margin: {
        2.7: '0.67em',
        '1em': '1em',
        '10px': '10px',
        '30px': '30px',
        '40px': '40px',
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
      },
      animation: {
        wave: 'wave 6s infinite linear',
      },
    },
  },
  plugins: [],
};
