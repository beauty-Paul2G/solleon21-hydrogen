/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-sand': 'var(--color-sand)',
        'c-light': 'var(--color-light)',
        'c-dark': 'var(--color-dark)'
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    },
  },
};
