/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/home/page.tsx',
    './app/login/page.tsx',
    './app/login/LoginForm.tsx',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}