/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        primary: {
          DEFAULT: '#1A237E',
          light: '#3949AB',
          dark: '#0D1338',
        },
        accent: {
          DEFAULT: '#E3F2FD',
          light: '#FFFFFF',
          dark: '#B1D9FA',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
};