/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      beige: '#f7ecde',
      lightGreen: '#54BAB9',
      darkBeige: '#E9C597',
      darkGreen: '#38938A',
      addBtnColor: '#F6F6F6',
      white: '#FFFFFF',
      completed: '#4CAF50',
      urgent: '#FF5252',
      later: '#9C27B0',
      black: '#000000',
      pink: '#FFC0CB',
      blue: '#87CEEB',
      yellow: '#FFD700',
      orange: '#FFA500',
      purple: '#9370DB',
      green: '#32CD32',
      red: '#FF0000',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
