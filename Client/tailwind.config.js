/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        vilaka: ["Vilaka", "Serif"],
        topmodern: ["TopModern"],
      },
      colors: {
        "light-0": "#f2f2f2",
        "light-1": "#a7b698",
        "light-2": "#737b69",
        "dark-2": "#737b69",
        "dark-1": "#31352e",
        "dark-0": "#191b17",
        "greenwater-0": "#296b70",
        "custom-white": "#f2f2f2",
        "custom-grey": "#212121",
        "custom-blue": "#296b70",
        "custom-green": "#7DAD4E",
        "custom-violet": "#b63fc3",
        "custom-black": "#242424",
      },
      backgroundImage: {
        logo: "url('/public/logo.svg')",
        video:
          "url(https://img.freepik.com/fotos-premium/retrato-mujer-hermosa-cabello-largo-sonriendo-mientras-camina-al-aire-libre_171337-105406.jpg)",
      },
    },
  },

  plugins: [],
};
