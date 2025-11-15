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
  safelist: [
    'h-48',
    'h-72',
    'h-96',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
};
