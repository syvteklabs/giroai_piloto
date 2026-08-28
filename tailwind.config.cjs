/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        giro: {
          grafite: '#101418',
          vermelho: '#F51B2B',
          turquesa: '#10BFB5',
          branco: '#FFFFFF',
          claro: '#F6F8F9',
          texto: '#151A20',
          'texto-sec': '#5B6470',
          borda: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
}
