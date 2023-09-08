/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': '"Nunito Variable"'
      },
      colors: {
        'primary': {
          '50': '#f3faf9',
          '100': '#d5f2eb',
          '200': '#abe4d7',
          '300': '#79cfbe',
          '400': '#4db4a4',
          '500': '#34988a',
          '600': '#247067',
          '700': '#23625b',
          '800': '#204f4b',
          '900': '#1e433f',
          '950': '#0c2725',
        },
        'danger': {
          '50': '#fdf3f3',
          '100': '#fbe5e5',
          '200': '#f9cfcf',
          '300': '#f4adad',
          '400': '#ec7d7d',
          '500': '#df5454',
          '600': '#cb3737',
          '700': '#ab2a2a',
          '800': '#8d2727',
          '900': '#702424',
          '950': '#400f0f',
        },
      }

    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms')
  ],
}
