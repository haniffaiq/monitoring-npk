/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Gilroy-Medium']
      }
    },

    backgroundColor: theme => ({
      ...theme('colors'),
      'Nitrogen': '#38ACFF',
      'Pospor': '#45DC6F',
      'Kalium': '#FFA9A9',
      'pH': '#AF9BFF',
      'Kelembapan': '#FF835C',
     })
  },
  plugins: [],
}

