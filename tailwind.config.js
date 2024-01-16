/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple gradient theme based on betamagic.nl
        primary: {
          50: '#f4f2f7',
          100: '#e9e4ef',
          200: '#d8ced9',
          300: '#c2b1c7',
          400: '#a891b0',
          500: '#8f6b98',
          600: '#674384',
          700: '#5a396f',
          800: '#442c58',
          900: '#2d1d3a',
        },
        secondary: {
          50: '#f8f7fb',
          100: '#f0eef6',
          200: '#e4dff0',
          300: '#d1c7e7',
          400: '#b8a7db',
          500: '#9d87ce',
          600: '#8169c0',
          700: '#6b4fb0',
          800: '#594196',
          900: '#4a3579',
        },
        accent: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        dark: {
          900: '#1a1625',
          800: '#2d1d3a',
          700: '#442c58',
          600: '#5a396f',
          500: '#674384',
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #674384 0%, #442c58 100%)',
        'purple-gradient-dark': 'linear-gradient(135deg, #2d1d3a 0%, #1a1625 100%)',
        'purple-overlay': 'linear-gradient(180deg, rgba(45,29,58,0) 0%, rgba(45,29,58,0.8) 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(103,67,132,0.95) 0%, rgba(68,44,88,0.98) 100%)',
      },
      boxShadow: {
        'movie': '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'movie-hover': '0 20px 40px -7px rgba(0, 0, 0, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}