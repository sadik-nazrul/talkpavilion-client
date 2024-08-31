/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/blue-pattern.jpeg')",
        'banner-bg': "url('/src/assets/hero-banner.jpeg')",
        'Anounce-bg': "url('/src/assets/announce.png')",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

