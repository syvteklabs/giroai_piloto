export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Giro AÍ',
  url: 'https://giroai.vercel.app',
  logo: 'https://images.giroaihub.com/giroai-b2b.png',
  description: 'Inteligência que faz o estoque girar - Transforme estoque parado em oportunidades comerciais',
  sameAs: [
    'https://www.instagram.com/giroai',
    'https://www.linkedin.com/company/giroai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    url: 'https://giroai.vercel.app/participar',
  },
  areaServed: 'BR',
  knowsAbout: [
    'Gestão de estoque',
    'Comércio eletrônico',
    'Oportunidades comerciais',
    'Análise territorial',
  ],
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Giro AÍ',
  image: 'https://images.giroaihub.com/giroai-b2b.png',
  description: 'Plataforma que conecta estoques de moda a novas oportunidades e revela dados territoriais',
  url: 'https://giroai.vercel.app',
  areaServed: {
    '@type': 'Country',
    name: 'BR',
  },
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const faqSchema = [
  {
    '@type': 'Question',
    name: 'Como funciona o Giro AÍ?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'O Giro AÍ conecta estoques de moda a novas oportunidades através de uma plataforma que registra produtos e setores, mostrando dados agregados em um mapa territorial em tempo real.',
    },
  },
  {
    '@type': 'Question',
    name: 'Meu setor também pode participar?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sim! Registre seu setor e ajude a mostrar onde o estoque parado afeta a economia regional. A plataforma está aberta para diversos segmentos.',
    },
  },
  {
    '@type': 'Question',
    name: 'Meus contatos ficam públicos?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Não. Seus contatos são privados e seguros. Apenas dados comerciais agregados aparecem no mapa. As conexões são intermediadas pelo Giro AÍ.',
    },
  },
]
