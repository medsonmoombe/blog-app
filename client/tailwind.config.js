/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5F8D75',
          light: '#8BBCA1',
          dark: '#3D4F46',
        },
      },
    },
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar,
  ],
};
