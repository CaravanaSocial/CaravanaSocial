/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        "custom-white": "#f2f2f2",
        "custom-grey": "#212121",
        "custom-blue": "#296b70",
        "custom-green": "#7DAD4E",
        "custom-violet": "#b63fc3",
        "custom-black": "#242424",
      },
      backgroundImage: {
        "logo": "url('/public/logo.svg')"
      }
    },
  },

  plugins: [],
}