/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        blue : {
          500 : "#387ed1"
        }
      }
    },
  },
  plugins: [],
}

