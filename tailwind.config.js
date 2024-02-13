/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      idf: '#528322',
      ocean: '#f2f6fd',
      stone: '#dce4ee',
      blue: '#0066ff',
      'dark-gray': '#6f6f6f',
      'bright-gray': '#cccccc',
      'one-zero-black': '#1f1f1f',
      white: colors.white,
    },
  },
  plugins: [],
}
