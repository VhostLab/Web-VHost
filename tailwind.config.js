/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#101010',       // Color principal
        secondary: '#fc7c04',     
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Fuente Poppins
        karla: ['Karla', 'sans-serif'],     // Fuente Karla (ya la usas en algunos textos)
        inter: ['Inter', 'sans-serif'],    // Nueva fuente Inter
      },
    },
  },
  plugins: [],
}

