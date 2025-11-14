const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '!./node_modules',
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
};
