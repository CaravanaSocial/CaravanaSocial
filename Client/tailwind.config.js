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
        "light-0": "#ffffff",
        "light-1": "#a7b698",
        "light-2": "#737b69",
        "dark-2": "#737b69",
        "dark-1": "#31352e",
        "dark-0": "#191b17"
      },
      backgroundImage: {
        "logo": "url('/public/logo.svg')"
      }
    },
  },

  plugins: [],
}

