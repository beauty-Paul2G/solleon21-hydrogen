/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        capuccino: 'var(--color-capuccino)',
        'greek-white': 'var(--color-greek-white)',
        'myrtle-green': 'var(--color-myrtle-green)',
        esmerald: 'var(--color-esmerald)',
        'black-coal': 'var(--color-black-coal)',
        camel: 'var(--color-camel)',
        'slate-green': 'var(--color-slate-green)',
        'warm-gray': 'var(--color-warm-gray)',
        'dark-gray': 'var(--color-dark-gray)',
        'roast-coffee': 'var(--color-roast-coffee)',
        white: 'var(--color-white)',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    },
  },
};
