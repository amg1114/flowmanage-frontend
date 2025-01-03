/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: { DEFAULT: '#3A7DA6', dark: '#599BC5' },
      secondary: { DEFAULT: '#84C7F0', dark: '#0F517B' },
      charcoal: { DEFAULT: '#343536', dark: '#EBF0F4' },
      canvas: { DEFAULT: '#F4F9FB', dark: '#04090B' },
      accent: {
        DEFAULT: '#7FBDB1',
        dark: '#428074',
        canvas: { DEFAULT: '#d1e7e5', dark: '#172d2b' },
      },
      error: '#d30000',
      success: '#007a37',
      transparent: 'transparent',
      white: '#ffffff',
      gray: '#f5f5f5',
      resource: {
        cyan: {
          DEFAULT: '#0FC3C3',
          dark: '#1DD4D4',
        },
        peach: {
          DEFAULT: '#FFAA8F',
          dark: '#FF9270',
        },
        lime: {
          DEFAULT: '#A6D93C',
          dark: '#8DC32E',
        },
        lavender: {
          DEFAULT: '#B494E8',
          dark: '#C6A3F4',
        },
        coral: {
          DEFAULT: '#F77F74',
          dark: '#E36A5E',
        },
        sunflower: {
          DEFAULT: '#F4D35E',
          dark: '#FFE165',
        },
        sky: {
          DEFAULT: '#76C7F4',
          dark: '#58B7E8',
        },
        rose: {
          DEFAULT: '#E89EB2',
          dark: '#D97A93',
        },
        emerald: {
          DEFAULT: '#56CC9D',
          dark: '#48B286',
        },
        amber: {
          DEFAULT: '#FFB347',
          dark: '#FF9F2B',
        },
      },
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
