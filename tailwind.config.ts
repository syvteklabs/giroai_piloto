import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        giro: {
          grafite: '#0B1218',
          vermelho: '#FF1F35',
          turquesa: '#08BDBA',
          branco: '#FFFFFF',
          claro: '#F7F9FA',
          texto: '#151A20',
          'texto-sec': '#56616F',
          borda: '#E5E7EB',
          'turquesa-claro': '#E6F5F4',
        },
      },
      fontSize: {
        clamp: 'clamp(1.5rem, 5vw, 3.5rem)',
      },
    },
  },
  plugins: [],
}
export default config
