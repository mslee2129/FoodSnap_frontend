/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // make sure to safelist these classes when using purge
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg'
  ],

  // enable dark mode via class strategy
  darkMode: 'class',

  mode: 'jit',

  plugins: [
    // include Flowbite as a plugin in your Tailwind CSS project
    require('flowbite/plugin')
  ],

  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        // palette?
        brownsugar: '#be6e46ff',
        teagreen: '#cde7b0ff',
        cambridgeblue: '#a3bfa8ff',
        slategray: '#7286a0ff',
        ebony: '#59594aff',
      },
    }
  },
}
