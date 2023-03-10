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

  // enable dark mode via media strategy - OS decide
  darkMode: 'media',

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
      amber: colors.amber
    },
    fontFamily: {
      sans: ['SpaceGrotesk', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        'space-grotesk': ['"Tilt Warp"', 'sans-serif'],
      },
      "@font-face": [
        {
          fontFamily: 'SpaceGrotesk',
          src: "url('src/resources/fonts/spacegrotesk/SpaceGrotesk-Bold.ttf') format('truetype')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        }
      ],
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        neutral: colors.neutral,
        stone: colors.stone,
        slate: colors.slate,
        zinc: colors.zinc,
        bluegray: colors.blueGray,
        coolgray: colors.coolGray,
        gray: colors.gray,
        truegray: colors.trueGray,
        warmgray: colors.warmGray,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
        'burntorange': '#ED9747',
        'mint': '#7FD1AE',
        'burntsalmon': '#C35356',
        'moonstone': '#66999B',
        'ferngreen': '#628B48',
        'charcoal': '#2F4858',
        'drabbrown': '#524632',
        'darkteal': '#336666',
        'darktealgray1': '#324B4B',
        'darktealgray2': '#95B1B0',
        'coral': '#F4845F',
        'bittersweetlight': '#F27059',
        'bittersweetdark': '#F25C54',
        'rustyred': '#DE3C4B',
        'oxfordblue': '#0A122A',
        'darkpurple': '#1D1128',
        'spacecadet': '#1B1F3B',
        'anotherdarkpurple': '#33202A',
        'anothercharcoal': '#233D4D',
        'jet': '#343434'
      },
    }
  },
}
