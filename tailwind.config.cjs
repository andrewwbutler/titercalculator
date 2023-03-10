/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    screens: {
      '1plate': '500px',
      '2plate': '850px',
      '3plate': '1250px',
      '3form': '1250px',
      '2form': '850px',
      '1form': '500px',
      '1opt': '500px',
      '2opt': '670px',
      '3opt': '980px'
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}
