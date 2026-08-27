import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        giro: {
          grafite: 'rgb(var(--color-giro-grafite) / <alpha-value>)',
          vermelho: 'rgb(var(--color-giro-vermelho) / <alpha-value>)',
          turquesa: 'rgb(var(--color-giro-turquesa) / <alpha-value>)',
          branco: 'rgb(var(--color-giro-branco) / <alpha-value>)',
          claro: 'rgb(var(--color-giro-claro) / <alpha-value>)',
          texto: 'rgb(var(--color-giro-texto) / <alpha-value>)',
          'texto-sec': 'rgb(var(--color-giro-texto-sec) / <alpha-value>)',
          borda: 'rgb(var(--color-giro-borda) / <alpha-value>)',
        },
      },
    },
  },
} satisfies Config
