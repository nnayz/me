import colors from 'tailwindcss/colors';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '!./node_modules',
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
};
