/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        artistic: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
