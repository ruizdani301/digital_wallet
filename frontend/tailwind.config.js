/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "primario-c": {
          200: "#CFCDFF",
          300: "#444965",
          400: "#2A2B4D",
          500: "#110F36"
        },
        "secondary-c": {
          200: "#a8bbff",
          300: "#7a74f1",
          400: "#645def",
          500: "#4F48ED",
          600: "#354da6"
        },
        "terciary-c": "#F8B40B"
      },
      backgroundColor: theme => ({
        ...theme("colors"),
        "blanco-c": "#F7F8FB",
        "placeholder-c": "#D8D7F8",
        "primario-c": {
          200: "#CFCDFF",
          300: "#444965",
          400: "#2A2B4D",
          500: "#110F36"
        },
        "secondary-c": {
          200: "#a8bbff",
          300: "#7a74f1",
          400: "#645def",
          500: "#4F48ED",
          600: "#354da6"
        },
        "terciary-c": "#F7E01C"
      }),
      ringColor: {
        "blanco-c": "#F7F8FB",
        "placeholder-c": "#D8D7F8",
        "primario-c": {
          200: "#CFCDFF",
          300: "#444965",
          400: "#2A2B4D",
          500: "#110F36"
        },
        "secondary-c": {
          200: "#a8bbff",
          300: "#7a74f1",
          400: "#645def",
          500: "#4F48ED",
          600: "#354da6"
        },
        "terciary-c": "#F7E01C"
      },
      borderColor: {
        "blanco-c": "#F7F8FB",
        "placeholder-c": "#D8D7F8",
        "primario-c": {
          200: "#CFCDFF",
          300: "#444965",
          400: "#2A2B4D",
          500: "#110F36"
        },
        "secondary-c": {
          200: "#a8bbff",
          300: "#7a74f1",
          400: "#645def",
          500: "#4F48ED",
          600: "#354da6"
        },
        "terciary-c": "#F7E01C"
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
