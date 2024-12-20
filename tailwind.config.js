/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "light-primary": "#3A7DA6",
      "dark-primary": "#599BC5",
      "light-secondary": "#84C7F0",
      "dark-secondary": "#0F517B",
      "light-text": "#343536",
      "dark-text": "#EBF0F4",
      "light-bg": "#F4F9FB",
      "dark-bg": "#04090B",
      "light-accent": "#7FBDB1",
      "dark-accent": "#428074",
    },
    fontFamily: {
      roboto: ["Roboto Condensed", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    }
  },
  plugins: [],
};
