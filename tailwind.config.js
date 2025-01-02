/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: { DEFAULT: '#3A7DA6', dark: '#599BC5' },
      secondary: { DEFAULT: '#84C7F0', dark: '#0F517B' },
      charcoal: { DEFAULT: '#343536', dark: '#EBF0F4' },
      base: { DEFAULT: '#F4F9FB', dark: '#04090B' },
      accent: { DEFAULT: '#7FBDB1', dark: '#428074' },
      error: '#d30000',
      success: '#007a37',
      transparent: 'transparent',
      white: '#ffffff',
      gray: '#f5f5f5',
    },
    fontFamily: {
      roboto: ['Roboto Condensed', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        xl: '0',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xxl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        heroThumb: "url('/hero/hero-thumb.jpg')",
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
