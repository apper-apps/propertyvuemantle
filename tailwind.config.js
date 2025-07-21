/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f1',
          100: '#dbecdd',
          200: '#b9d9bf',
          300: '#8ec098',
          400: '#5f9f6c',
          500: '#2C5530',
          600: '#274b2a',
          700: '#203d23',
          800: '#1c321e',
          900: '#18291a'
        },
        secondary: {
          50: '#f7f5f2',
          100: '#ede8e1',
          200: '#ddd2c6',
          300: '#c9b5a3',
          400: '#b39580',
          500: '#8B7355',
          600: '#7d664c',
          700: '#68543f',
          800: '#564436',
          900: '#47382c'
        },
        accent: {
          50: '#fef9eb',
          100: '#fef1c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#E8B04B',
          600: '#d69e2e',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        surface: '#FFFFFF',
        background: '#F5F2ED',
        success: '#4A7C59',
        warning: '#D4A574',
        error: '#B85651',
        info: '#5B8A8D'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}