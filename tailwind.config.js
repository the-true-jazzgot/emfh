/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Condensed','sans-serif']
      },
    },
    colors: {
      'primary': '#4f2a93',
      'dark': '#4e4a57',
      'white':'#fdfdfd',
      'container' : '#edecee',
    }
  },
  plugins: [],
}

