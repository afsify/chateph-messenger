/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ["Cabin"],
      },
      colors: {
        "dark-purple": "#314573",
        "light-dark": "#151415",
        "medium-dark": "#0E0E0E",
        "light-gray": "#1f1f1f",
        "light-purple": "rgba(8, 26, 81, 0.17)",
        "light-white": "rgba(255,255,255,0.17)",
        "medium-white": "rgba(192, 192, 192, 0.1)",
        "light-red": "rgba(255, 102, 102, 0.17)",
        "light-green": "rgba(102, 255, 102, 0.17)",
      },
    },
  },
  plugins: [],
};
