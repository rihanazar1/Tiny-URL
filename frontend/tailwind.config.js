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
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#8B5CF6',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        background: {
          DEFAULT: '#1A1528',
          card: '#231F35',
        },
        text: {
          DEFAULT: '#F4F3F6',
          light: '#B8B5C3',
        },
        border: '#2E2640',
      },
    },
  },
  plugins: [],
}