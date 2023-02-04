/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': '"Plus Jakarta Sans"'
      },
      colors: {
        'primary': '#635FC7',
        'primary-light': '#A8A4FF',
        'secondary': ' hsla(242, 48%, 58%, 0.25)',
        'secondary-light': 'hsla(242, 48%, 58%, 0.1)',
        'danger': '#EA5555',
        'danger-light': '#FF9898'
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms')
  ],
}
